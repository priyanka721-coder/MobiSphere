import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { PRODUCTS } from "./src/data.js";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory / simple file-based JSON logging persistence
const ORDERS_FILE = path.join(process.cwd(), "orders.json");
const QUERIES_FILE = path.join(process.cwd(), "queries.json");

// Helper utilities for loading/saving
function loadData<T>(filePath: string, defaultValue: T[]): T[] {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data) as T[];
    }
  } catch (err) {
    console.error(`Error loading file ${filePath}:`, err);
  }
  return defaultValue;
}

function saveData<T>(filePath: string, list: T[]): void {
  try {
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error writing file ${filePath}:`, err);
  }
}

// Interfaces for our types
interface Order {
  id: string;
  orderNo: string;
  productId: string;
  productName: string;
  productPrice: number;
  customerName: string;
  customerPhone: string;
  deliveryType: string;
  status: "Pending" | "Verified" | "Dispatched" | "Cancelled" | "Completed";
  createdAt: string;
}

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Initial storage load
let orders: Order[] = loadData<Order>(ORDERS_FILE, []);
let queries: ContactQuery[] = loadData<ContactQuery>(QUERIES_FILE, []);

// --- Backend API Routes ---

// Health verification
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", backend: "express", timestamp: new Date() });
});

// GET products catalog dynamically from server-side source
app.get("/api/products", (req, res) => {
  res.json(PRODUCTS);
});

// GET Order list for the Admin Portal
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

// POST submit a new Order reservation
app.post("/api/orders", (req, res) => {
  const { productId, count, customerName, customerPhone, deliveryType } = req.body;
  
  if (!productId || !customerName || !customerPhone) {
    return res.status(400).json({ error: "Missing required order parameters." });
  }

  const matchedProduct = PRODUCTS.find((p) => p.id === productId);
  if (!matchedProduct) {
    return res.status(404).json({ error: "Device not found in catalog." });
  }

  const randNo = "MS-" + Math.floor(100000 + Math.random() * 900000);
  
  const newOrder: Order = {
    id: "ord-" + Math.floor(100000 + Math.random() * 900000),
    orderNo: randNo,
    productId,
    productName: matchedProduct.name,
    productPrice: matchedProduct.price,
    customerName,
    customerPhone,
    deliveryType,
    status: "Pending",
    createdAt: new Date().toISOString()
  };

  orders.unshift(newOrder);
  saveData(ORDERS_FILE, orders);

  res.status(201).json({ 
    success: true, 
    orderNo: randNo, 
    order: newOrder,
    message: "Device hold secured successfully." 
  });
});

// POST edit order status (Admin operation)
app.post("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Verified", "Dispatched", "Cancelled", "Completed"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

  const orderIndex = orders.findIndex((o) => o.id === id);
  if (orderIndex === -1) {
    return res.status(404).json({ error: "Order not found." });
  }

  orders[orderIndex].status = status;
  saveData(ORDERS_FILE, orders);

  res.json({ success: true, order: orders[orderIndex] });
});

// DELETE remove / cancel order (Admin/User operation)
app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const initialLen = orders.length;
  orders = orders.filter((o) => o.id !== id);

  if (orders.length === initialLen) {
    return res.status(404).json({ error: "Order not found." });
  }

  saveData(ORDERS_FILE, orders);
  res.json({ success: true, message: "Order reservation deleted successfully." });
});

// GET support feedback messages (Admin portal)
app.get("/api/queries", (req, res) => {
  res.json(queries);
});

// POST save contact feedback submission
app.post("/api/queries", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required contact details." });
  }

  const newQuery: ContactQuery = {
    id: "qry-" + Math.floor(100000 + Math.random() * 900000),
    name,
    email,
    subject: subject || "No Specific Subject",
    message,
    createdAt: new Date().toISOString()
  };

  queries.unshift(newQuery);
  saveData(QUERIES_FILE, queries);

  res.status(201).json({ 
    success: true, 
    query: newQuery,
    message: "Support submission secured successfully." 
  });
});

// DELETE archieve contact message
app.delete("/api/queries/:id", (req, res) => {
  const { id } = req.params;
  const initialLen = queries.length;
  queries = queries.filter((q) => q.id !== id);

  if (queries.length === initialLen) {
    return res.status(404).json({ error: "Support submission not found." });
  }

  saveData(QUERIES_FILE, queries);
  res.json({ success: true, message: "Query archived successfully." });
});

// POST Gemini Smart Shopping Advisor Route
app.post("/api/advisor", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  if (!geminiKey) {
    // Graceful offline simulated responses
    const lastUserMessage = (messages[messages.length - 1]?.content || "").toLowerCase();
    let advice = "Hello! I am your MobiAI smart advisor. To get dynamic personalized advice, make sure to add your GEMINI_API_KEY in the Settings > Secrets section. Based on our stock: For photo enthusiasts, the Vivo V30 Pro with Zeiss co-created triple lens is unrivaled. For high-speed everyday 5G connectivity on a reasonable budget, check out our newly updated Realme Narzo 60 5g (₹19,999). Would you like help booking a device hold?";
    if (lastUserMessage.includes("budget") || lastUserMessage.includes("cheap") || lastUserMessage.includes("low")) {
      advice = "Hi there! If you are on a budget, our best-selling model is the Realme Narzo 60 5g priced at ₹19,999 (reduced from ₹25,999). It boasts custom gesture-less swipe interfaces, high-capacity dual-glass design, and superb Sony night vision sensors. You can trigger a secure Device Hold from the catalog above!";
    } else if (lastUserMessage.includes("camera") || lastUserMessage.includes("photo") || lastUserMessage.includes("pic")) {
      advice = "Hello! For professional grade photography, the Vivo V30 Pro with Zeiss premium portraits stands unparalleled at ₹49,999. Alternatively, the Realme Narzo 60 5G comes with a beautiful Sony IMX890 Camera which is superb for low-light night captures. Both are ready for immediate store pickup reservations!";
    }
    return res.json({ text: advice });
  }

  try {
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({
      apiKey: geminiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const systemPrompt = `You are "MobiAI Advisor", the premium intelligent smartphone consultant for "MobiSphere".
Your goal is to guide clients to select the absolute best smartphone from our live catalog, or answer general smartphone questions they have.
Keep answers concise (maximum 3 sentences), extremely friendly, design-centric, and focused on helping the customer make a decision.

Live MobiSphere catalog contents:
${JSON.stringify(PRODUCTS.map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  description: p.description,
  price: p.price,
  specs: p.specs,
  badge: p.badge,
  inStock: p.inStock
})), null, 2)}

Instructions:
1. Always reference our catalog's smartphones by name when recommending.
2. Explain briefly why a specific model from our catalog stands out for their need (e.g., Zeiss lenses on Vivo V30 Pro for portraits, Sony Night Sensors on Realme Narzo 60 5g).
3. Keep the tone premium, warm, helpful, and polite. Always end on a helpful question or a prompt to hold/book.`;

    const conversationHistory = messages
      .slice(-6) // limit to last 6 messages to stay efficient
      .map((m: any) => `${m.role === "user" ? "Client" : "MobiAI"}: ${m.content}`)
      .join("\n");
      
    const fullPrompt = `${conversationHistory}\nClient: ${messages[messages.length - 1]?.content}\nMobiAI:`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: fullPrompt }],
        },
      ],
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini Advisor API Error:", err);
    res.status(500).json({ error: "Failed to generate AI advice. Please try again." });
  }
});

// --- Vite Middleware Server Setup ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server successfully running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

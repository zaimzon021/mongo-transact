/**
 * Example only: an Express checkout endpoint that uses mongo-transact.
 *
 * Stock decrement + order creation happen in one transaction, or neither
 * happens. This file is documentation, not part of the test suite, and it
 * expects a real MongoDB client. Install `mongodb` and `express` to run it.
 */
import { MongoClient } from "mongodb";
import { withTransaction } from "../src/index";

interface CheckoutBody {
  sku: string;
  userId: string;
}

export function makeCheckoutHandler(client: MongoClient, dbName: string) {
  return async (req: { body: CheckoutBody }, res: {
    status(code: number): { json(body: unknown): void };
    json(body: unknown): void;
  }) => {
    const { sku, userId } = req.body;
    try {
      const order = await withTransaction(
        client,
        async (session) => {
          const db = client.db(dbName);
          // Note: with the real driver, `session` here is a ClientSession.
          // It is cast only because this example is driver-agnostic in shape.
          const updated = await db.collection("stock").updateOne(
            { sku, qty: { $gte: 1 } },
            { $inc: { qty: -1 } },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            { session: session as any },
          );
          if (updated.modifiedCount !== 1) {
            throw new Error("Out of stock");
          }
          const newOrder = { sku, userId, createdAt: new Date() };
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          await db.collection("orders").insertOne(newOrder, { session: session as any });
          return newOrder;
        },
        { maxAttempts: 3, timeoutMs: 10_000 },
      );
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : "Checkout failed" });
    }
  };
}

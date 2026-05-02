require('dotenv').config();
const { createApp } = require('./app');
const { connectDb } = require('./config/db');

const PORT = Number(process.env.PORT) || 5000;

async function main() {
  await connectDb();
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`UniSkillSwap API listening on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err.message);
  process.exit(1);
});

const { PrismaClient } = require('../../src/generated/prisma');
const prisma = new PrismaClient();

module.exports.create = async (req, res) => {
  const { name, money, type } = req.body;

  try {
    await prisma.list.create({
      data: {
        name,
        money: Number(money),
        type,
      },
    });
    res.status(201).json({
      message: 'สร้างข้อมูลสำเร็จ',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
  }
};

module.exports.getData = async (req, res) => {
  const data = await prisma.list.findMany();
  try {
    res.status(201).json({
      data,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
  }
};

module.exports.deleteItem = async (req, res) => {
  try {
    const { name } = await req.params;
    await prisma.list.delete({ where: { name } });
    res.status(201).json({
      message: 'ลบข้อมูลสำเร็จ',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: err.message });
  }
};

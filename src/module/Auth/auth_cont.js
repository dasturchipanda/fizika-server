import { generateToken } from '../../utils/jwt.js';
import {getUsers, Register, userMatch, getUserbyId} from './auth_model.js'
import nodemailer from 'nodemailer';
const emailCodes = new Map(); // temporary storage for email verification codes

const transporter = nodemailer.createTransport({
  host: 'mail.fizikacspu.uz',
  port: 465,
  secure: true, // SSL ishlatyapti
  auth: {
    user: 'fizikasupport@fizikacspu.uz',
    pass: 'zetplus02', // cPanelda yaratganingiz
  },
});

export const sendCodeToEmail = async (req, res) => {
  const { user_email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000);

  const mailOptions = {
    from: '"Fizika CSPU" <fizikasupport@fizikacspu.uz>',
    to: user_email,
    subject: 'Ro‘yxatdan o‘tish kodi',
    text: `Sizning tasdiqlash kodingiz: ${code}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    emailCodes.set(user_email, code);
    res.status(200).json({ message: 'Kod yuborildi' });
  } catch (err) {
    console.error('Email xatoligi:', err);
    res.status(500).json({ error: 'Kod yuborilmadi', details: err.message });
  }
};


export const registerWithCode = async (req, res) => {
  const { user_email, user_password, user_firstname, user_lastname, user_ageyear, code } = req.body;

  try {
    const storedCode = emailCodes.get(user_email);
    if (!storedCode || String(storedCode) !== String(code)) {
      return res.status(400).json({ error: 'Tasdiqlash kodi noto‘g‘ri yoki muddati o‘tgan' });
    }

    const existingUser = await userMatch(user_email);
    console.log(existingUser);
    
    if (!existingUser) {
      return res.status(400).json({ error: 'Bu email ro‘yxatdan o‘tgan' });
    }

    const newUser = await Register(user_email, user_password, user_firstname, user_lastname, user_ageyear);
    const token = generateToken(newUser);

    emailCodes.delete(user_email); // clear used code

    res.status(201).json({ token });
  } catch (error) {
  console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
  res.status(500).json({ error: 'Server error' });
}
};


// Get all users
const getAllusers = async (req, res) => {
  try {
    const users = await getUsers();
    
    res.json(users);
  } catch (error) {
  console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
  res.status(500).json({ error: 'Server error' });
}
};

const getOneUser = async (req, res) => {
  try {
    const user = await getUserbyId(req.params.id);
    res.json(user);
  } catch (error) {
  console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
  res.status(500).json({ error: 'Server error' });
}
};

// Tizimga kirish
const loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;
  
  try {
    const user = await userMatch(user_email);
    if (!user) {
      return res.status(400).json({ error: 'Foydalanuvchi topilmadi' });
    }
    
    const isMatch = user[0].user_password == user_password;
    

    if (!isMatch) {
      return res.status(400).json({ error: 'Noto\'g\'ri parol' });
    }

    const token = generateToken(user[0]);
    res.json({ token });
  } catch (error) {
  console.error("❌ Xatolik:", error); // bu qatorni qo‘shing
  res.status(500).json({ error: 'Server error' });
}
};

export {getAllusers, loginUser, getOneUser};
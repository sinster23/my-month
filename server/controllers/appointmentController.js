const Appointment = require("../models/Appointment");

// Create appointment
exports.createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const existing = await Appointment.findOne({ doctorId, date, time });
    if (existing)
      return res.status(400).json({ message: "Slot already booked" });

    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId,
      date,
      time,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get logged-in user’s appointments
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate("doctorId", "name specialization image consultationFee")
      .sort({ createdAt: -1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

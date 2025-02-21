"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    message: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation: Check if fields are empty
    const newErrors = {
      name: form.name.trim() === "",
      email: form.email.trim() === "",
      message: form.message.trim() === "",
    };
    setErrors(newErrors);

    // Do nothing for now
    if (!newErrors.name && !newErrors.email && !newErrors.message) {
      console.log("Form submitted", form);
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      // Increased width from max-w-lg to max-w-2xl
      className="mx-auto max-w-2xl w-full px-6 md:px-12 lg:px-24 py-12 bg-slate-800/80 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        Get in Touch
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className={`w-full px-5 py-3 rounded-md bg-slate-900 text-white border ${
              errors.name
                ? "border-red-500"
                : "border-transparent focus:border-emerald-400"
            } focus:ring-emerald-400 outline-none transition`}
            placeholder="Your Name"
          />
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={`w-full px-5 py-3 rounded-md bg-slate-900 text-white border ${
              errors.email
                ? "border-red-500"
                : "border-transparent focus:border-emerald-400"
            } focus:ring-emerald-400 outline-none transition`}
            placeholder="Your Email"
          />
        </div>

        {/* Message Field */}
        <div>
          <label className="block text-slate-300 font-medium mb-1">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            className={`w-full px-5 py-3 rounded-md bg-slate-900 text-white border ${
              errors.message
                ? "border-red-500"
                : "border-transparent focus:border-emerald-400"
            } focus:ring-emerald-400 outline-none transition`}
            placeholder="Your Message"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-md font-medium transition"
        >
          Send Message
        </motion.button>
      </form>
    </motion.section>
  );
};

export default ContactForm;

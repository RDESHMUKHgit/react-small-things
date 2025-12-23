/* eslint-disable react-refresh/only-export-components */
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';

import { Form, useActionData, useNavigate } from 'react-router-dom';

export async function contactAction({ request }) {
  const formData = Object.fromEntries(await request.formData());

  // Here you can send data to API or email service
  console.log('Submitted data:', formData);

  // Example: simulate success
  return { success: true, name: formData.name };
}

const Contact = () => {
  const [darkMode, setDarkMode] = useState(true);
  const actionData = useActionData();
  const navigate = useNavigate();

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   message: '',
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log('Form submitted:', formData);
  //   alert(`Thanks ${formData.name}! Your message has been sent.`);

  //   // Clear form
  //   setFormData({ name: '', email: '', message: '' });
  // };

  useEffect(() => {
    if (actionData?.success) {
      const timer = setTimeout(() => {
        navigate('/', { replace: true });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [actionData, navigate]);

  return (
    <section className={darkMode ? 'dark' : ''}>
      <section className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navbar */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold">
              Contact <span className="text-blue-500">Me</span>
            </h1>
            <p className="mt-6 text-gray-600 dark:text-gray-400">
              Have an idea, collaboration, or just want to say hi? Drop a
              message — let’s build something cool.
            </p>
          </div>

          {/* Form */}
          <div className="mt-16 max-w-xl bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
            {/* <form className="space-y-6" onSubmit={handleSubmit}> */}
            {/* Name */}
            {/* <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

            {/* Email */}
            {/* <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

            {/* Message */}
            {/* <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows="4"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div> */}

            {/* <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              >
                Send Message 🚀
              </button> */}
            {/* </form> */}

            {/* Form using React Router */}
            <Form method="post" className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  required
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  required
                  name="message"
                  rows="4"
                  placeholder="Your message..."
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              >
                Send Message 🚀
              </button>
            </Form>

            {actionData?.success && (
              <p className="mt-4 text-green-500 font-medium">
                Thanks {actionData.name}! Your message has been sent.
                Redirecting to Home Page...
              </p>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </section>
    </section>
  );
};

export default Contact;

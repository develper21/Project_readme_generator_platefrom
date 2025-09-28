"use client";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import { Bell, Shield, User, Eye } from "lucide-react";

export default function Setting() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [timeZone, setTimeZone] = useState("UTC");
  const [profileVisibility, setProfileVisibility] = useState("Public");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-8">
        {/* Account Settings */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" /> Account Settings
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                defaultValue="sarah@example.com"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Time Zone</label>
              <select
                value={timeZone}
                onChange={(e) => setTimeZone(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="UTC">UTC</option>
                <option value="PST">PST</option>
                <option value="EST">EST</option>
                <option value="IST">IST</option>
              </select>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-indigo-500" /> Security
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onChange={setTwoFactorEnabled}
                className={`${
                  twoFactorEnabled ? "bg-indigo-600" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">Update your password regularly</p>
              </div>
              <button className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">
                Change
              </button>
            </div>
          </div>
        </section>

        {/* Notifications */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-indigo-500" /> Notifications
          </h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
              <Switch
                checked={emailNotifications}
                onChange={setEmailNotifications}
                className={`${
                  emailNotifications ? "bg-indigo-600" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    emailNotifications ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Get notified on your device</p>
              </div>
              <Switch
                checked={pushNotifications}
                onChange={setPushNotifications}
                className={`${
                  pushNotifications ? "bg-indigo-600" : "bg-gray-300"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    pushNotifications ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>
          </div>
        </section>

        {/* Privacy */}
        <section className="bg-white shadow rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-500" /> Privacy
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
              <select
                value={profileVisibility}
                onChange={(e) => setProfileVisibility(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="Public">Public</option>
                <option value="Friends">Friends Only</option>
                <option value="Private">Private</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Data Analytics</p>
                <p className="text-sm text-gray-500">Help improve our service</p>
              </div>
              <Switch
                checked={true}
                onChange={() => {}}
                className="bg-indigo-600 relative inline-flex h-6 w-11 items-center rounded-full"
              >
                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
              </Switch>
            </div>
          </div>
        </section>

        {/* Save Changes */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

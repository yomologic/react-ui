import { useState } from "react";
import { Card, RadioGroup, Checkbox, CodeSnippet } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";

export function FormControlsSection() {
  const [selectedFruit, setSelectedFruit] = useState("apple");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [newsletter, setNewsletter] = useState(false);

  return (
    <SectionLayout hasStickyPreview>
      {/* Sticky Preview Section */}
      <section className="sticky top-0 z-15 py-4 bg-gray-50">
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            {/* Heading */}
            <div className="border-b border-gray-200 pb-3">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Form Controls
              </h1>
              <p className="text-sm text-gray-600">
                Radio buttons and checkboxes for form selections
              </p>
            </div>

            {/* Preview */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Live Preview
              </h3>
              <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <RadioGroup
                    label="Radio Buttons"
                    name="preview-fruit"
                    value={selectedFruit}
                    onChange={setSelectedFruit}
                    options={[
                      { value: "apple", label: "Apple" },
                      { value: "banana", label: "Banana" },
                      { value: "orange", label: "Orange" },
                    ]}
                  />
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 mb-1">
                      Checkboxes
                    </label>
                    <div className="space-y-2">
                      <Checkbox
                        label="Accept terms"
                        checked={termsAccepted}
                        onChange={setTermsAccepted}
                        id="preview-terms"
                      />
                      <Checkbox
                        label="Notifications"
                        checked={notifications}
                        onChange={setNotifications}
                        id="preview-notifications"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Scrollable Content */}
      {/* Radio Buttons */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Radio Buttons
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="elevated" padding="lg">
            <RadioGroup
              label="Vertical Layout"
              name="fruit"
              value={selectedFruit}
              onChange={setSelectedFruit}
              options={[
                { value: "apple", label: "Apple" },
                { value: "banana", label: "Banana" },
                { value: "orange", label: "Orange" },
                { value: "grape", label: "Grape (Disabled)", disabled: true },
              ]}
            />
            <div className="mt-4 text-sm text-gray-600">
              Selected: <strong>{selectedFruit}</strong>
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <RadioGroup
              label="Horizontal Layout"
              name="size"
              value="medium"
              options={[
                { value: "small", label: "Small" },
                { value: "medium", label: "Medium" },
                { value: "large", label: "Large" },
              ]}
              orientation="horizontal"
            />
          </Card>
        </div>
      </section>

      {/* Radio Code Example */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Radio Button Usage
        </h2>
        <CodeSnippet
          code={`<RadioGroup
  name="fruit"
  value={selectedFruit}
  onChange={setSelectedFruit}
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ]}
/>

// Horizontal layout
<RadioGroup
  name="size"
  orientation="horizontal"
  options={[...]}
/>`}
        />
      </section>

      {/* Checkboxes */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Checkboxes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card variant="elevated" padding="lg">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Basic Checkboxes
            </label>
            <div className="space-y-3">
              <Checkbox
                label="I accept the terms and conditions"
                checked={termsAccepted}
                onChange={setTermsAccepted}
                id="terms"
              />
              <Checkbox
                label="Send me notifications"
                checked={notifications}
                onChange={setNotifications}
                id="notifications"
              />
              <Checkbox
                label="Subscribe to newsletter"
                checked={newsletter}
                onChange={setNewsletter}
                id="newsletter"
              />
              <Checkbox
                label="This is disabled"
                checked={false}
                disabled
                id="disabled"
              />
            </div>
          </Card>

          <Card variant="elevated" padding="lg">
            <label className="block text-sm font-semibold text-gray-600 mb-1">
              Checkbox States
            </label>
            <div className="space-y-3">
              <Checkbox label="Unchecked" checked={false} id="unchecked" />
              <Checkbox label="Checked" checked={true} id="checked" />
              <Checkbox
                label="Disabled Unchecked"
                checked={false}
                disabled
                id="disabled-unchecked"
              />
              <Checkbox
                label="Disabled Checked"
                checked={true}
                disabled
                id="disabled-checked"
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Checkbox Code Example */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Checkbox Usage
        </h2>
        <CodeSnippet
          code={`const [accepted, setAccepted] = useState(false);

<Checkbox
  label="I accept the terms"
  checked={accepted}
  onChange={setAccepted}
  id="terms"
/>

// Disabled state
<Checkbox
  label="Disabled option"
  checked={false}
  disabled
  id="disabled"
/>`}
        />
      </section>

      {/* Real-world Example */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Real-world Example
        </h2>
        <Card variant="elevated" padding="lg" className="max-w-2xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Preferences Form
          </h3>
          <div className="space-y-6">
            <RadioGroup
              label="Email Frequency"
              name="frequency"
              value="weekly"
              options={[
                { value: "daily", label: "Daily updates" },
                { value: "weekly", label: "Weekly digest" },
                { value: "monthly", label: "Monthly summary" },
                { value: "never", label: "Never" },
              ]}
            />

            <div className="border-t pt-4">
              <label className="block text-sm font-semibold text-gray-600 mb-1">
                Notification Settings
              </label>
              <div className="space-y-2">
                <Checkbox
                  label="Email notifications"
                  checked={notifications}
                  onChange={setNotifications}
                  id="email-notif"
                />
                <Checkbox
                  label="Push notifications"
                  checked={true}
                  id="push-notif"
                />
                <Checkbox
                  label="SMS notifications (Coming soon)"
                  checked={false}
                  disabled
                  id="sms-notif"
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <Checkbox
                label="I agree to receive marketing communications"
                checked={newsletter}
                onChange={setNewsletter}
                id="marketing"
              />
            </div>
          </div>
        </Card>
      </section>
    </SectionLayout>
  );
}

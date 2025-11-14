import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";
import { Mail, Lock, Search, ArrowRight } from "lucide-react";

export function ExamplesSection() {
  return (
    <SectionLayout hasStickyPreview>
      {/* Sticky Preview Section */}
      <section className="sticky top-0 z-15 py-4 bg-gray-50">
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            {/* Heading */}
            <div className="border-b border-gray-200 pb-3">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Examples
              </h1>
              <p className="text-sm text-gray-600">
                Real-world component combinations
              </p>
            </div>

            {/* Preview */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Live Preview
              </h3>
              <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card variant="bordered" padding="sm">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-sm font-bold">
                        JD
                      </div>
                      <p className="text-xs font-medium">John Doe</p>
                      <Badge variant="success" size="sm" dot>
                        Active
                      </Badge>
                    </div>
                  </Card>
                  <Card variant="bordered" padding="sm">
                    <Input placeholder="Search..." />
                  </Card>
                  <Card variant="bordered" padding="sm">
                    <Button variant="primary" size="sm" className="w-full">
                      Action
                    </Button>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Scrollable Content */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Login Form</h2>
        <Card variant="elevated" padding="lg" className="max-w-md">
          <CardHeader>
            <CardTitle>Welcome Back</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                leftIcon={<Mail className="w-5 h-5" />}
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                leftIcon={<Lock className="w-5 h-5" />}
              />
              <Button variant="primary" size="lg" className="w-full">
                Sign In
              </Button>
              <Button variant="ghost" size="sm" className="w-full">
                Forgot password?
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          User Profile Card
        </h2>
        <Card variant="elevated" padding="lg" className="max-w-sm">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h3 className="text-lg font-semibold">John Doe</h3>
              <p className="text-sm text-gray-500">john@example.com</p>
            </div>
            <div className="flex justify-center gap-2">
              <Badge variant="primary">Developer</Badge>
              <Badge variant="success" dot>
                Active
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                Message
              </Button>
              <Button variant="primary" size="sm" className="flex-1">
                Follow
              </Button>
            </div>
          </div>
        </Card>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Search with Filters
        </h2>
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            <Input
              label="Search"
              placeholder="Search for anything..."
              leftIcon={<Search className="w-5 h-5" />}
            />
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Filters
              </label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">All</Badge>
                <Badge variant="default">Active</Badge>
                <Badge variant="default">Pending</Badge>
                <Badge variant="default">Completed</Badge>
              </div>
            </div>
            <Button
              variant="primary"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Apply Filters
            </Button>
          </div>
        </Card>
      </section>
    </SectionLayout>
  );
}

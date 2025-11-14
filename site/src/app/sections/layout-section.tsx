import { Card } from "@yomologic/react-ui";
import { Container } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";

export function LayoutSection() {
  return (
    <SectionLayout hasStickyPreview>
      {/* Sticky Preview Section */}
      <section className="sticky top-0 z-15 py-4 bg-gray-50">
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            {/* Heading */}
            <div className="border-b border-gray-200 pb-3">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Layout</h1>
              <p className="text-sm text-gray-600">
                Layout helpers and containers
              </p>
            </div>

            {/* Preview */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Live Preview
              </h3>
              <div className="p-6 bg-linear-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200 space-y-2">
                <Container
                  maxWidth="sm"
                  padding={false}
                  className="bg-blue-100 py-2 rounded"
                >
                  <p className="text-xs text-center text-gray-700">
                    Small Container
                  </p>
                </Container>
                <Container
                  maxWidth="md"
                  padding={false}
                  className="bg-green-100 py-2 rounded"
                >
                  <p className="text-xs text-center text-gray-700">
                    Medium Container
                  </p>
                </Container>
                <Container
                  maxWidth="lg"
                  padding={false}
                  className="bg-purple-100 py-2 rounded"
                >
                  <p className="text-xs text-center text-gray-700">
                    Large Container
                  </p>
                </Container>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Scrollable Content */}
      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Container Widths
        </h2>
        <Card variant="elevated" padding="lg">
          <div className="space-y-4">
            <Card variant="bordered" padding="sm">
              <h3 className="text-sm font-medium mb-2">Small (sm)</h3>
              <Container
                maxWidth="sm"
                padding={false}
                className="bg-blue-50 py-3"
              >
                <p className="text-xs text-center text-gray-600">
                  max-w-screen-sm
                </p>
              </Container>
            </Card>

            <Card variant="bordered" padding="sm">
              <h3 className="text-sm font-medium mb-2">Medium (md)</h3>
              <Container
                maxWidth="md"
                padding={false}
                className="bg-green-50 py-3"
              >
                <p className="text-xs text-center text-gray-600">
                  max-w-screen-md
                </p>
              </Container>
            </Card>

            <Card variant="bordered" padding="sm">
              <h3 className="text-sm font-medium mb-2">Large (lg)</h3>
              <Container
                maxWidth="lg"
                padding={false}
                className="bg-purple-50 py-3"
              >
                <p className="text-xs text-center text-gray-600">
                  max-w-screen-lg
                </p>
              </Container>
            </Card>

            <Card variant="bordered" padding="sm">
              <h3 className="text-sm font-medium mb-2">Extra Large (xl)</h3>
              <Container
                maxWidth="xl"
                padding={false}
                className="bg-orange-50 py-3"
              >
                <p className="text-xs text-center text-gray-600">
                  max-w-screen-xl
                </p>
              </Container>
            </Card>
          </div>
        </Card>
      </section>
    </SectionLayout>
  );
}

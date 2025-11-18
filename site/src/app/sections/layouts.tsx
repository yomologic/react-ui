import { Card } from "@yomologic/react-ui";
import { Container } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";

export function LayoutSection() {
  return (
    <SectionLayout>
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

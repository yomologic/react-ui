"use client";

import { Card } from "@yomologic/react-ui";
import { Container } from "@yomologic/react-ui";
import { SectionLayout } from "@yomologic/react-ui";

export default function LayoutPage() {
    return (
        <SectionLayout>
            <section>
                <h2 className="text-h2 font-semibold theme-text mb-4">
                    Container Widths
                </h2>
                <Card variant="elevated" padding="lg">
                    <div className="space-y-4">
                        <Card variant="bordered" padding="sm">
                            <h3 className="text-small font-medium mb-2">
                                Small (sm)
                            </h3>
                            <Container
                                maxWidth="sm"
                                padding={false}
                                className="bg-[color-mix(in_srgb,var(--color-primary)_10%,transparent)] py-3"
                            >
                                <p className="text-caption text-center theme-text-muted">
                                    max-w-screen-sm
                                </p>
                            </Container>
                        </Card>

                        <Card variant="bordered" padding="sm">
                            <h3 className="text-small font-medium mb-2">
                                Medium (md)
                            </h3>
                            <Container
                                maxWidth="md"
                                padding={false}
                                className="bg-green-50 py-3"
                            >
                                <p className="text-caption text-center theme-text-muted">
                                    max-w-screen-md
                                </p>
                            </Container>
                        </Card>

                        <Card variant="bordered" padding="sm">
                            <h3 className="text-small font-medium mb-2">
                                Large (lg)
                            </h3>
                            <Container
                                maxWidth="lg"
                                padding={false}
                                className="bg-purple-50 py-3"
                            >
                                <p className="text-caption text-center theme-text-muted">
                                    max-w-screen-lg
                                </p>
                            </Container>
                        </Card>

                        <Card variant="bordered" padding="sm">
                            <h3 className="text-small font-medium mb-2">
                                Extra Large (xl)
                            </h3>
                            <Container
                                maxWidth="xl"
                                padding={false}
                                className="bg-orange-50 py-3"
                            >
                                <p className="text-caption text-center theme-text-muted">
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

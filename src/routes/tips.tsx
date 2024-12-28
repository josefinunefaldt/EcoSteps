import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tips")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello from Tips!</div>;
}

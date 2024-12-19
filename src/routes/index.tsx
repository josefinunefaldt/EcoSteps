import { createFileRoute } from "@tanstack/react-router";
import Form from "../components/form";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Form />;
}

/**
 * Login has been removed from this app, so this guard is now a pass-through:
 * it simply renders its children. Kept as a component (rather than deleted) so
 * the existing route definitions in App.jsx don't need restructuring.
 */
export default function ProtectedRoute({ children }) {
  return children
}

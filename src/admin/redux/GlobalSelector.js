// Placeholder for Global Selectors
// This is for static display purposes only

// In a real application, this would contain:
// - Reselect selectors
// - Memoized selectors for performance
// - State selectors for components

export const selectUser = (state) => state.global?.user || null;
export const selectVendors = (state) => state.global?.vendors || [];
export const selectOrders = (state) => state.global?.orders || [];

export default {
  selectUser,
  selectVendors,
  selectOrders,
};


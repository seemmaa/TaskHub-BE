if (!context.user || context.user.role !== 'admin') {
    throw new Error('Admin access only');
  }
  
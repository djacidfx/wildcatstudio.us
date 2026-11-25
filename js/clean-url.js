/* Keep public URLs free of campaign tags without losing page state. */
(function () {
  try {
    var query = window.location.search;
    if (!query) return;
    var parts = query.slice(1).split('&');
    var clean = parts.filter(function (part) {
      var key = part.split('=', 1)[0];
      try { key = decodeURIComponent(key.replace(/\+/g, ' ')); } catch (_) {}
      return !/^utm_/i.test(key);
    });
    if (clean.length === parts.length) return;
    clean = clean.filter(Boolean);
    window.history.replaceState(window.history.state, '',
      window.location.pathname + (clean.length ? '?' + clean.join('&') : '') + window.location.hash);
  } catch (_) { /* Navigation must still work if history access is restricted. */ }
})();

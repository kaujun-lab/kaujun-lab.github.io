(function () {
  function buildAffiliatePayload(product, offer) {
    var selectedOffer = offer || {};
    return {
      product_id: product.id,
      product_title: product.title,
      merchant: selectedOffer.merchant || product.merchant,
      store: selectedOffer.store || "",
      link_type: selectedOffer.linkType || "",
      category: product.category,
      short_title: product.shortTitle
    };
  }

  function trackAffiliateClick(product, offer) {
    var payload = buildAffiliatePayload(product, offer);

    if (typeof window.gtag === "function") {
      window.gtag("event", "affiliate_click", payload);
    }

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push(Object.assign({ event: "affiliate_click" }, payload));
    }

    if (window.analytics && typeof window.analytics.track === "function") {
      window.analytics.track("affiliate_click", payload);
    }

    return payload;
  }

  window.KaujunAnalytics = {
    buildAffiliatePayload: buildAffiliatePayload,
    trackAffiliateClick: trackAffiliateClick
  };
}());

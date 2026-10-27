window.ALCHEMISTS_CONFIG = {
  domain: 'https://www.alchemistsnetwork.com',

  // GoHighLevel join form (SOP Chapter 4).
  // Paste ONLY the Form ID between the quotes, e.g. 'aBcD1234xYz'.
  ghlFormId: 'UAgprRCNqEPYEisqX5ec',

  // GoHighLevel "Update your details" form for existing WhatsApp members
  // (page alchemistsnetwork.com/update). Paste ONLY its Form ID.
  ghlUpdateFormId: 'PASTE_GHL_UPDATE_FORM_ID_HERE',
  ghlFormBaseUrl: 'https://api.leadconnectorhq.com/widget/form/',

  // Names sent to GoHighLevel. They must match the options of the
  // "AN Interest" custom field exactly (SOP Chapter 3).
  interests: {
    finance: 'Finance',
    health: 'Health',
    relationships: 'Relationships',
    spirituality: 'Spirituality',
    general: 'General'
  },

  // WhatsApp invite links. If a link is reset in WhatsApp, change it ONLY here.
  whatsapp: {
    general: 'https://chat.whatsapp.com/CqV23si04OeDWLwyNe3afU?mode=gi_t',
    finance: 'https://chat.whatsapp.com/DwdfPfTX2CaLBtLlTPW6TW?mode=gi_t',
    health: 'https://chat.whatsapp.com/Lq6F1ew0Lln2rxjnjPETs5?mode=gi_t',
    relationships: 'https://chat.whatsapp.com/JA5MxqR97IL6zFOlqp44tw?mode=gi_t',
    spirituality: 'https://chat.whatsapp.com/BOoHztbgLTdDc0IygmRYM0?mode=gi_t'
  }
};

export const languages = ['hr', 'en', 'fr', 'de', 'it'] as const;

export type Language = (typeof languages)[number];

const _translations = {
	headingHeatPump: {
		hr: 'Ponuda za ugradnju dizalice topline',
		en: 'Offer for the installation of a heat pump',
		fr: "Offre pour l'installation d'une pompe à chaleur",
		de: 'Angebot für die Installation einer Wärmepumpe',
		it: "Offerta per l'installazione di una pompa di calore"
	},
	headingSolar: {
		hr: 'Ponuda za izgradnju solarne elektrane',
		en: 'Offer for the construction of a solar power plant',
		fr: "Offre pour la construction d'une centrale solaire",
		de: 'Angebot für den Bau eines Solarkraftwerks',
		it: 'Offerta per la costruzione di una centrale solare'
	},
	headingMixed: {
		hr: 'Ponuda za ugradnju dizalice topline i solarne elektrane',
		en: 'Offer for the installation of a heat pump and solar power plant',
		fr: "Offre pour l'installation d'une pompe à chaleur et d'une centrale solaire",
		de: 'Angebot für die Installation einer Wärmepumpe und eines Solarkraftwerks',
		it: "Offerta per l'installazione di una pompa di calore e di una centrale solare"
	},
	number: {
		hr: 'br.',
		en: 'no.',
		fr: 'non.',
		de: 'nein.',
		it: 'no.'
	},
	subtitle: {
		hr: 'Prilog 1. ugovoru',
		en: 'Annex 1 to the contract',
		fr: 'Annexe 1 au contrat',
		de: 'Anhang 1 zum Vertrag',
		it: 'Allegato 1 al contratto'
	},
	titleSecond: {
		hr: 'Prilog 1. ugovoru - Ponuda br.',
		en: 'Annex 1 to the contract - Offer no.',
		fr: 'Annexe 1 au contrat - Offre non.',
		de: 'Anhang 1 zum Vertrag - Angebot nein.',
		it: 'Allegato 1 al contratto - Offerta no.'
	},
	date: {
		hr: 'Datum',
		en: 'Date',
		fr: 'Date',
		de: 'Datum',
		it: 'Data'
	},
	user: {
		hr: 'Korisnik',
		en: 'User',
		fr: 'Utilisateur',
		de: 'Benutzer',
		it: 'Utente'
	},
	address: {
		hr: 'Adresa građevine',
		en: 'Building address',
		fr: 'Adresse du bâtiment',
		de: 'Gebäudeadresse',
		it: "Indirizzo dell'edificio"
	},
	omm: {
		hr: 'Šifra OMM',
		en: 'OMM code',
		fr: 'Code OMM',
		de: 'OMM-Code',
		it: 'Codice OMM'
	},
	oib: {
		hr: 'OIB',
		en: 'VAT ID',
		fr: 'Numéro de TVA',
		de: 'Umsatzsteuer-ID',
		it: 'Partita IVA'
	},
	phone: {
		hr: 'Broj telefona',
		en: 'Phone number',
		fr: 'Numéro de téléphone',
		de: 'Telefonnummer',
		it: 'Numero di telefono'
	},
	email: {
		hr: 'Email',
		en: 'Email',
		fr: 'Email',
		de: 'Email',
		it: 'Email'
	},
	amountNetto: {
		hr: 'Iznos ponude',
		en: 'Amount of the offer',
		fr: "Montant de l'offre",
		de: 'Angebotsbetrag',
		it: "Importo dell'offerta"
	},
	amountBrutto: {
		hr: 'Iznos bez PDVa',
		en: 'Amount without VAT',
		fr: 'Montant hors TVA',
		de: 'Betrag ohne MwSt.',
		it: 'Importo senza IVA'
	},
	amountTax: {
		hr: 'Iznos PDVa',
		en: 'Amount of VAT',
		fr: 'Montant de la TVA',
		de: 'MwSt.-Betrag',
		it: "Importo dell'IVA"
	},
	amountTotal: {
		hr: 'Ukupan iznos ponude',
		en: 'Total offer amount',
		fr: "Montant total de l'offre",
		de: 'Gesamtangebotsbetrag',
		it: "Importo totale dell'offerta"
	},
	detailsProduct: {
		hr: 'Podaci o proizvodu i usluzi',
		en: 'Product and service information',
		fr: 'Informations sur les produits et services',
		de: 'Produkt- und Dienstleistungsinformationen',
		it: 'Informazioni sui prodotti e servizi'
	},
	detailsPayment: {
		hr: 'Podaci o plaćanju',
		en: 'Payment information',
		fr: 'Informations de paiement',
		de: 'Zahlungsinformationen',
		it: 'Informazioni di pagamento'
	},
	detailsDescription: {
		hr: 'Opis proizvoda i usluge',
		en: 'Product and service description',
		fr: 'Description du produit et du service',
		de: 'Produkt- und Dienstleistungsbeschreibung',
		it: 'Descrizione del prodotto e del servizio'
	},
	client: {
		hr: 'Klijent',
		en: 'Client',
		fr: 'Client',
		de: 'Kunde',
		it: 'Cliente'
	},
	invoice: {
		hr: 'Ponuda',
		en: 'Invoice',
		fr: 'Facture',
		de: 'Rechnung',
		it: 'Fattura'
	}
};

type Strings = keyof typeof _translations;

export const useTranslation = (language: Language) => {
	const t: Record<Strings, string> = {} as Record<Strings, string>;
	Object.keys(_translations).forEach((key) => {
		t[key as Strings] = _translations[key as Strings][language];
	});

	return { t };
};

export const translations = _translations as Record<
	keyof typeof _translations,
	Record<Language, string>
>;

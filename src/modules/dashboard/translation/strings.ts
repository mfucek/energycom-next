import { TranslationList } from '@/modules/translation/types';

export const strings = {
	general: {
		theme: {
			hr: 'Tema',
			en: 'Theme',
			fr: 'Thème'
		},
		language: {
			hr: 'Jezik',
			en: 'Language',
			fr: 'Langue'
		}
	},
	actions: {
		view: {
			hr: 'Pregledaj',
			en: 'View',
			fr: 'Vue'
		},
		download: {
			hr: 'Preuzmi',
			en: 'Download',
			fr: 'Télécharger'
		},
		translate: {
			hr: 'Prevedi',
			en: 'Translate',
			fr: 'Traduire'
		}
	},
	invoicing: {
		dashboardTitle: {
			hr: 'Nova Ponuda',
			en: 'New Invoice',
			fr: 'Nouvelle facture'
		},
		longTitle: {
			hr: 'Nova Ponuda',
			en: 'New Invoice',
			fr: 'Nouvelle facture'
		},
		description: {
			hr: 'Unesite potrebne podatke, zatim ispišite ponudu u PDF obliku.',
			en: 'Enter the required data, then print the offer in PDF format.',
			fr: "Entrez les données requises, puis imprimez l'offre au format PDF."
		},
		client: {
			tabTitle: {
				hr: 'Klijent',
				en: 'Client',
				fr: 'Client'
			},
			clientDetailsTitle: {
				hr: 'Podaci o klijentu',
				en: 'Client data',
				fr: 'Données client'
			},
			field: {
				user: {
					hr: 'Korisnik',
					en: 'User',
					fr: 'Utilisateur'
				},
				buildingAddress: {
					hr: 'Adresa građevine',
					en: 'Building address',
					fr: 'Adresse du bâtiment'
				},
				email: {
					hr: 'Email',
					en: 'Email',
					fr: 'Email'
				},
				phoneNumber: {
					hr: 'Broj telefona',
					en: 'Phone number',
					fr: 'Numéro de téléphone'
				},
				identificationNumber: {
					hr: 'OIB',
					en: 'VAT ID',
					fr: 'Numéro de TVA'
				}
			}
		},
		invoice: {
			tabTitle: {
				hr: 'Ponuda',
				en: 'Invoice',
				fr: 'Facture'
			},
			invoiceIdentificationTitle: {
				hr: 'Broj i datum ponude',
				en: 'Invoice number and date',
				fr: 'Numéro de facture et date'
			},
			invoiceLanguageTitle: {
				hr: 'Jezik ponude',
				en: 'Invoice language',
				fr: 'Langue de la facture'
			},
			invoiceAmountTitle: {
				hr: 'Iznos ponude',
				en: 'Invoice amount',
				fr: 'Montant de la facture'
			},
			field: {
				number: {
					hr: 'Broj ponude',
					en: 'Invoice number',
					fr: 'Numéro de facture'
				},
				date: {
					hr: 'Datum ponude',
					en: 'Invoice date',
					fr: 'Date de la facture'
				},
				language: {
					hr: 'Jezik ponude',
					en: 'Invoice language',
					fr: 'Langue de la facture'
				},
				basisAmount: {
					hr: 'Osnovica',
					en: 'Basis',
					fr: 'Base'
				},
				taxAmount: {
					hr: 'Iznos PDV',
					en: 'VAT amount',
					fr: 'Montant de la TVA'
				},
				totalAmount: {
					hr: 'Ukupno',
					en: 'Total',
					fr: 'Total'
				},
				withVAT: {
					hr: '(sa PDV)',
					en: '(with VAT)',
					fr: '(avec TVA)'
				}
			}
		},
		items: {
			tabTitle: {
				hr: 'Stavke',
				en: 'Items',
				fr: 'Articles'
			},
			invoiceContentTitle: {
				hr: 'Sadržaj ponude',
				en: 'Invoice content',
				fr: 'Contenu de la facture'
			},
			item: {
				solar: {
					hr: 'Solarna Elektrana',
					en: 'Solar Power Plant',
					fr: 'Centrale solaire'
				},
				heatPump: {
					hr: 'Dizalica topline',
					en: 'Heat pump',
					fr: 'Pompe à chaleur'
				}
			},
			field: {
				itemDetails: {
					hr: 'Podaci o proizvodu i usluzi',
					en: 'Product and service data',
					fr: 'Données sur le produit et le service'
				},
				itemDescription: {
					hr: 'Opis proizvoda i usluge',
					en: 'Product and service description',
					fr: 'Description du produit et du service'
				},
				paymentDetails: {
					hr: 'Podaci o plaćanju',
					en: 'Payment data',
					fr: 'Données de paiement'
				},
				omm: {
					hr: 'OMM',
					en: 'OMM',
					fr: 'OMM'
				},
				translated: {
					hr: 'Prevedeno',
					en: 'Translated',
					fr: 'Traduit'
				}
			}
		}
	}
} satisfies TranslationList;

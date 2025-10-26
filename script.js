// --- FUNKSJON FOR Å OPPDATERE HENVENDELSESLENKEN MED FARGE ---
/**
 * Oppdaterer lenken til kontaktskjemaet med valgt produktnavn og farge.
 * Finner den valgte fargen ved å se etter aria-checked="true" på fargeknappene.
 */
function updateInquiryLinkAndColor() {
    const inquiryButton = document.getElementById('henvendelse-knapp');
    if (!inquiryButton) return;

    // Finner den valgte fargen (knappen som har aria-checked="true")
    const selectedColorButton = document.querySelector('.farge-sirkel[aria-checked="true"]');
    
    // Henter produktnavn fra den eksisterende lenken (som JS har satt tidligere)
    const currentHref = inquiryButton.getAttribute('href');
    const baseUrl = currentHref.split('?')[0]; // Forventer "kontakt.html"
    const existingParams = new URLSearchParams(currentHref.split('?')[1]);
    
    const produktNavn = existingParams.get('produkt') || "Ukjent Produkt"; 
    
    let newHref = `${baseUrl}?produkt=${encodeURIComponent(produktNavn)}`;

    if (selectedColorButton) {
        // Henter den lesbare fargen ("Klassisk Brun", etc.)
        const colorLabel = selectedColorButton.getAttribute('aria-label');
        // Legger fargen til i URL-en
        newHref += `&farge=${encodeURIComponent(colorLabel)}`;
    }
    
    // Oppdaterer lenkens href med den nye URL-en
    inquiryButton.href = newHref;
}

// --- DEN ORIGINALE SCRIPT.JS KODEN STARTER HER ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Funksjon for å hente verdier fra URL-spørringsparametre
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }
    
    // --- 1. SIMULERT PRODUKTDATA (OPPDATERT FOR DOKUMENTMAPPE 'EXECUTIVE') ---
    const productData = {
        '001': { 
            title: 'Skinnveske \'Minimal\'', 
            price: '1 999 kr', 
            imageSrc: 'placeholder-veske-1.png', 
            description: 'Denne minimalistiske skinnvesken er håndsydd med vegetabilsk garvet lær av høyeste kvalitet. Designet for den moderne brukeren, tilbyr den elegant funksjonalitet uten unødvendige detaljer. Perfekt for laptop og daglige nødvendigheter, den blir bare vakrere med årene.',
            specs: [
                'Materiale: 100% fullnarvet lær',
                'Mål: 38cm x 28cm x 8cm (Passer til 13-14" laptop)',
                'Lukkemekanisme: Solid magnetisk knappelukking',
                'Garanti: Livstidsgaranti på sømmer'
            ],
            galleryImages: [
                { src: 'placeholder-veske-1.png', alt: 'Skinnveske forfra (Hovedvisning)' },
                { src: 'placeholder-veske-2.png', alt: 'Skinnveske sidevisning med rem' },
                { src: 'placeholder-veske-3.png', alt: 'Detaljbilde av veskens innside' }
            ]
        },
        '002': { 
            title: 'Lommebok \'Tynn\'', 
            price: '499 kr', 
            imageSrc: 'placeholder-kort-1.png', 
            description: 'En ultratynn lommebok designet for minimalisten. Den holder de viktigste kortene og sedlene uten å bygge opp volum. Ideell for frontlommen.',
            specs: [
                'Materiale: Premium vegetabilsk garvet lær',
                'Kapasitet: 6 kortspor + seddellomme',
                'Mål: 10cm x 7.5cm',
                'Egenskap: RFID-beskyttet'
            ],
            galleryImages: [
                { src: 'placeholder-kort-1.png', alt: 'Lommebok Tynn forfra' },
                { src: 'placeholder-kort-2.png', alt: 'Lommebok Tynn åpen' },
                { src: 'placeholder-kort-3.png', alt: 'Detaljbilde av kortsiden' }
            ]
        },
        '003': { 
            title: 'Nøkkelring \'Klassisk\'', 
            price: '149 kr', 
            imageSrc: 'placeholder-ring-1.png', 
            description: 'En enkel, men elegant nøkkelring i tykt, slitesterkt lær. Den perfekte lille gaven eller en luksuriøs oppgradering til dine egne nøkler.',
            specs: [
                'Materiale: Tykt kuskinn med naturlig patina',
                'Beslag: Solid messingkrok',
                'Lengde: 12 cm',
                'Egenskap: Gravering mulig'
            ],
            galleryImages: [
                { src: 'placeholder-ring-1.png', alt: 'Nøkkelring i lær med messingkrok' }
            ]
        },
        '004': { 
            title: 'Skinnbelte \'Håndsydd\'', 
            price: '799 kr', 
            imageSrc: 'placeholder-belte-1.png', 
            description: 'Et klassisk, håndsydd skinnbelte som er bygget for å vare livet ut. Beltet har en tidløs design og en robust spenne i massiv messing.',
            specs: [
                'Materiale: Fullnarvet lær, 4 mm tykt',
                'Bredde: 35 mm',
                'Spenne: Solid messing',
                'Egenskap: Justerbar lengde'
            ],
            galleryImages: [
                { src: 'placeholder-belte-1.png', alt: 'Skinnbelte med spenne forfra' },
                { src: 'placeholder-belte-2.png', alt: 'Detaljbilde av beltesøm og lærtekstur' },
                { src: 'placeholder-belte-3.png', alt: 'Skinnbelte rullet opp' }
            ]
        },
        '005': { 
            title: 'Kortholder \'Liten\'', 
            price: '299 kr', 
            imageSrc: 'placeholder-pung-1.png', 
            description: 'Den ultimate kortholderen for deg som kun trenger det mest essensielle. Kompakt, lett og bygget for å tåle daglig bruk i årevis.',
            specs: [
                'Materiale: Smidig okseskinn',
                'Kapasitet: 4 kortspor (passer 1-2 kort per spor)',
                'Mål: 9.5cm x 6.5cm',
                'Egenskap: Ekstremt slank profil'
            ],
            galleryImages: [
                { src: 'placeholder-pung-1.png', alt: 'Kortholder, forfra' },
                { src: 'placeholder-pung-2.png', alt: 'Kortholder, innside' },
                { src: 'placeholder-pung-3.png', alt: 'Kortholder, sidevisning' }
            ]
        },
        '006': { 
            title: 'Dokumentmappe \'Executive\'', 
            price: '2 499 kr', 
            // OPPDATERT HOVEDBILDE TIL INDEX/PRODUKTER/DETALJ
            imageSrc: 'placeholder-doku-1.png',
            description: 'En luksuriøs A4 dokumentmappe som utstråler profesjonalitet. Perfekt for møter, reiser og organisering av viktige papirer. Denne mappen er et ekte statement-stykke.',
            specs: [
                'Materiale: Glatt italiensk lær',
                'Kapasitet: Plass til A4-blokk, penner og dokumenter',
                'Mål: 34cm x 26cm',
                'Garanti: 5 års håndverksgaranti'
            ],
            // NYTT: TRE BILDER I GALLERIET
            galleryImages: [
                { src: 'placeholder-doku-1.png', alt: 'Dokumentmappe, lukket forfra' },
                { src: 'placeholder-doku-2.png', alt: 'Dokumentmappe, åpen innside' },
                { src: 'placeholder-doku-3.png', alt: 'Dokumentmappe, detalj av lås' }
            ]
        }
    };

    // --- 2. LOGIKK FOR PRODUKTDETALJSIDEN ---
    if (window.location.pathname.includes('produkt-detalj.html')) {
        
        const productId = getQueryParam('id'); 
        
        if (productId && productData[productId]) {
            const product = productData[productId];
            
            // Oppdaterer tittel, pris og sidetittel
            const productTitleElement = document.querySelector('.produkt-info h1');
            if (productTitleElement) {
                productTitleElement.textContent = product.title;
                document.title = `${product.title} – Skinnverket`;
            }
            
            const priceElement = document.querySelector('.pris-stor');
            if (priceElement) {
                priceElement.textContent = product.price;
            }
            
            // Henter hovedbilde og container for miniatyrer
            const hovedBilde = document.getElementById('hovedproduktbilde'); 
            const miniBilderContainer = document.querySelector('.mini-bilder');


            // --- ROBUST SIKRING FOR HOVEDBILDET START ---
            if (hovedBilde && product.galleryImages && product.galleryImages.length > 0) {
                // Bruk FØRSTE bilde i galleriet som hovedbilde
                const firstImage = product.galleryImages[0];
                hovedBilde.src = firstImage.src; 
                hovedBilde.alt = firstImage.alt; 
            } else if (hovedBilde) {
                 // Fallback til imageSrc hvis ingen galleryImages finnes
                hovedBilde.src = product.imageSrc; 
                hovedBilde.alt = `Hovedbilde av ${product.title}`; 
            }
            // --- ROBUST SIKRING FOR HOVEDBILDET SLUTT ---

            // Oppdaterer produktbeskrivelse
            const descriptionElement = document.querySelector('.produkt-info p');
            if (descriptionElement) {
                descriptionElement.textContent = product.description;
            }

            // Oppdaterer spesifikasjoner
            const specsList = document.querySelector('.produkt-info ul');
            if (specsList) {
                specsList.innerHTML = ''; // Tømmer listen først
                product.specs.forEach(spec => {
                    const listItem = document.createElement('li');
                    const parts = spec.split(':');
                    if (parts.length > 1) {
                        listItem.innerHTML = `<strong>${parts[0]}:</strong>${parts.slice(1).join(':')}`;
                    } else {
                         listItem.textContent = spec;
                    }
                    specsList.appendChild(listItem);
                });
            }
            
            // Oppdaterer henvendelsesknappen
            const henvendelseKnapp = document.getElementById('henvendelse-knapp');
            if(henvendelseKnapp) {
                const urlEncodedTitle = encodeURIComponent(product.title);
                henvendelseKnapp.href = `kontakt.html?produkt=${urlEncodedTitle}`;
                henvendelseKnapp.setAttribute('aria-label', `Send en henvendelse om ${product.title}`);
                
                updateInquiryLinkAndColor(); 
            }

            // --- LOGIKK FOR DYNAMISK BILDEGALLERI ---
            if (hovedBilde && miniBilderContainer && product.galleryImages) {
                
                miniBilderContainer.innerHTML = ''; // Tømmer containeren 
                
                // SKJULER CONTAINEREN HVIS DET KUN ER ETT BILDE (eller ingen)
                if (product.galleryImages.length <= 1) {
                     miniBilderContainer.style.display = 'none';
                } else {
                     miniBilderContainer.style.display = 'flex'; // Vis hvis det er flere
                }

                product.galleryImages.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;
                    img.setAttribute('tabindex', '0');
                    img.setAttribute('data-src', image.src);
                    
                    if (index === 0) {
                        img.classList.add('aktiv');
                    }

                    img.addEventListener('click', function() {
                        const nyBildeSrc = this.getAttribute('data-src');
                        
                        hovedBilde.src = nyBildeSrc;
                        hovedBilde.alt = this.alt;

                        miniBilderContainer.querySelectorAll('img').forEach(m => m.classList.remove('aktiv'));
                        this.classList.add('aktiv');
                    });

                    miniBilderContainer.appendChild(img);
                });
            }
            
        } else if (!productId) {
            const productTitleElement = document.querySelector('.produkt-info h1');
            if (productTitleElement) {
                 productTitleElement.textContent = 'Produkt ikke funnet.';
            }
        }
        
        // Fargevelger for produktdetaljsiden
        const fargevelgerContainer = document.querySelector('.fargevelger');

        if (fargevelgerContainer) {
            const fargeSirkler = fargevelgerContainer.querySelectorAll('.farge-sirkel');
            
            const initiallySelected = fargevelgerContainer.querySelector('.valgt');
            if (!initiallySelected) {
                // Legger til 'valgt' på den første fargen hvis ingen er valgt
                if (fargeSirkler.length > 0) {
                    fargeSirkler[0].classList.add('valgt');
                    fargeSirkler[0].setAttribute('aria-checked', 'true');
                }
            } else {
                 // Sørger for at én farge alltid er valgt (hvis HTML har statiske farger)
                 initiallySelected.setAttribute('aria-checked', 'true');
            }

            fargeSirkler.forEach(sirkel => {
                sirkel.addEventListener('click', () => {
                    
                    fargeSirkler.forEach(s => {
                        s.classList.remove('valgt');
                        s.setAttribute('aria-checked', 'false');
                    });
                    sirkel.classList.add('valgt');
                    sirkel.setAttribute('aria-checked', 'true');

                    const valgtFarge = sirkel.dataset.farge;
                    console.log(`Farge valgt: ${valgtFarge}`);
                    
                    updateInquiryLinkAndColor(); 
                });
            });
        }
    }

    
    // --- 3. LOGIKK FOR KONTAKTSKJEMA ---
    const produktInput = document.getElementById('produktnavn');
    if (produktInput) {
        const produktNavn = getQueryParam('produkt');
        
        if (produktNavn) {
            produktInput.value = decodeURIComponent(produktNavn);
            const emneInput = document.getElementById('emne');
            if (emneInput && emneInput.value === '') {
                emneInput.value = `Henvendelse: ${decodeURIComponent(produktNavn)}`;
            }
        } else {
            produktInput.value = 'Generell henvendelse';
        }
    }
    
});
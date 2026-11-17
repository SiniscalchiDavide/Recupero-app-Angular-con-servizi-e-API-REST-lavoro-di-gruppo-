# Guida Rapida: Avvio, Test e Comandi Angular (Ambiente Portable)

Questa guida contiene tutti i comandi principali per gestire il progetto **jsonplaceholder-app** utilizzando Node.js e Angular in modalità portable.

---

## 1. Avvio dell'ambiente di lavoro
1. Apri la cartella `AmbienteAngular` sulla chiavetta.
2. Fai doppio clic sul file **`.code-workspace`** per aprire VS Code già configurato.
3. Apri il terminale integrato in VS Code con **`Ctrl + ò`**.

### Verifica che Node portable sia attivo
```powershell
where.exe node
```
*(Deve restituire il percorso dentro la cartella `AmbienteAngular\node\node.exe`).*

---

## 2. Installazione e Avvio del Sito
Spostati sempre prima nella cartella dell'applicazione Angular:
```powershell
cd jsonplaceholder-app
```

### Installare le dipendenze (solo la prima volta o se cambia `package.json`)
```powershell
npm.cmd install
```

### Avviare il server di sviluppo (il sito in locale)
```powershell
npm.cmd start
```
* **Indirizzo locale**: Apri il browser su `http://localhost:4200/` (oppure `Ctrl + Clic` sul link nel terminale).
* **Per fermare il server**: Clicca nel terminale e premi **`Ctrl + C`**.

---

## 3. Comandi per Test e Compilazione (Build)

### Eseguire i test automatici (Vitest)
```powershell
npm.cmd test
```

### Compilare il progetto per verificare errori (Build di produzione)
```powershell
npm.cmd run build
```
*(Crea la cartella `dist/` con i file ottimizzati per il web).*

### Compilazione continua in modalità sviluppo
```powershell
npm.cmd run watch
```

---

## 4. Comandi Angular CLI (`ng`) senza installazione globale
Per generare nuovi elementi senza installare Angular su Windows, usa **`npx.cmd`**:

* **Creare un nuovo componente**:
  ```powershell
  npx.cmd ng generate component nome-componente
  ```
* **Creare un nuovo servizio**:
  ```powershell
  npx.cmd ng generate service nome-servizio
  ```
* **Creare un'interfaccia / modello**:
  ```powershell
  npx.cmd ng generate interface modelli/nome-modello
  ```

---

## 5. Comandi Git utili (Terminale)
* **Controllare lo stato dei file modificati**:
  ```powershell
  git status
  ```
* **Scaricare gli ultimi aggiornamenti dei compagni da GitHub**:
  ```powershell
  git pull
  ```
* **Salvare e inviare le modifiche su GitHub** (in alternativa all'interfaccia grafica di VS Code):
  ```powershell
  git add .
  git commit -m "Descrizione delle modifiche"
  git push
  ```

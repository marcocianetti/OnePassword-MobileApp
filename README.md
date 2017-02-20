# One Password
Progetto contenente il codice per l'applicazione mobile del progetto "One Password".

## Introduzione
L'applicazione, sviluppata con [React Native](https://facebook.github.io/react-native/ "React Native Homepage"),
permette grazie all'estensione Chrome abbinata di salvare le password per i propri siti preferiti ed accedervi da Browser
dopo un semplice Login da app mobile.

## Info per lo sviluppo

### Json Server
Nella cartella *json_server* è presente un file *.json* che funge da database "di test" per l'applicazione.
È possibile avviare un server con delle chiamate auto-generate, dipendenti dal file *.json*, utilizzando 
[Json Server](https://github.com/typicode/json-server "Json Server").
Una volta installato, da terminale posizionarsi nella cartella *json_server* e utilizzare:
```
> json-server db.json
```
A questo punto sarà disponibile un server in ascolto su `localhost:3000` (di default).

### Applicazione Android
Per avviare l'applicazione Android è necessario:
* Avviare il packager;
* Avviare l'applicazione;
* (Opzionale) Avviare il log.

#### Avvio packager
Posizionarsi nella cartella del progetto e utilizzare:
```
> react-native start
```

#### Avvio applicazione Android
Avviare l'emulatore o collegare il dispositivo fisico,
posizionarsi nella cartella del progetto e utilizzare:
```
> react-native run-android
```
Se si possiede un dispositivo con Android < 5 allora potrebbero incorrere dei problemi.

#### Avvio log
Utilizzare:
```
> react-native log-android
```

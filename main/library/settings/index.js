const changesets = require('diff-json');
const defaultSettings = require('./defaultSettings');


// Classe pour pouvoir conserver la flexibilité du provider de settings (pas sûr de conserver electron-settings)

class Settings {
    constructor(settingsProvider) {
        this.settingsProvider = settingsProvider;
        this.defaultSettings = defaultSettings;
    }

    // Lance la procédure de vérification des données contenues dans electron-settings
    start() {

        if (!this.settingsProvider.has('init') || process.argv[2] === '--reset') {

            this.settingsProvider.setAll(Object.assign({init: Date.now()}, this.defaultSettings));
            return true;

        } else {

            let changes = changesets.diff(this.settingsProvider.getAll(), this.defaultSettings);
            if(changes.length >0) {
                for(let change in changes){
                    switch (changes[change].type){
                        case "add":
                            this.addSetting(changes[change]);
                            break;
                        case "remove":
                            this.removeSetting(changes[change]);
                            break;
                        case "update":
                            break;
                    }
                }
            }
        }

    }
    addSetting(change){
        this.settingsProvider.set(change.key, change.value);
    }
    removeSetting(change){
        if (change.key !== "init"){
            this.settingsProvider.delete(change.key);
        }
    }


}


exports = module.exports = Settings;
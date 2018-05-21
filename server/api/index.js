import { getImagesNasa } from './nasa/nasa'

module.exports = (app) => {
    app.get('/api/nasa', getImagesNasa);
};

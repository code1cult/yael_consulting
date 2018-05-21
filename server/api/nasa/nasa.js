import fs from 'fs'
import request from 'request'

const getImage = (body) => {

    body.forEach((image) => {
        request.get({url: image.links[0].href, encoding: 'binary'},  (err, response, body) => {
            fs.writeFile("./img/"+image.data[0].nasa_id + '.jpg', body, 'binary', (err) => {
                if(err)
                    console.log(err);
                else
                    console.log("The file was saved!");
            });
        });
    })
}

const createRepots = (body, res) => {
    console.log(body);
    res.send(body);

    body.forEach((image) => {
        fs.writeFile('./meta/'+image.data[0].nasa_id+ '.txt', 'NASA ID: '+image.data[0].nasa_id+' \n' +
            'Keywords: '+ image.data[0].keywords +'\n' +
            'Center: ' + image.data[0].center+ '\n' +
            'Date Created: '+image.data[0].date_created+' \n' +
            ''+image.data[0].description+' \n' +
            'Photo Credit: '+ image.data[0].photographer+'', 'utf8', (err) => {

        });

    })
    getImage(body)

}

export const getImagesNasa = (req, res, next) => {
    var options = { method: 'GET',
        url: 'https://images-assets.nasa.gov/recent.json',
        headers:
            { 'postman-token': '6099c7d9-22d2-d2d7-5fa6-34c189239350',
                'cache-control': 'no-cache' } };

    request(options,  (error, response, body) => {
        if (error) throw new Error(error);
        createRepots(JSON.parse(body).collection.items, res)
    });
}
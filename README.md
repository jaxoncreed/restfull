# Restfull

A web application that allows you to set up your RESTful backend in minutes.


Example JSON to start the Generator

POST: http://localhost:3000/create

{
    "repoName": "test-back-end",
    "repoDescription": "This Back End is a Test",
    "framework": "sails",
    "database": "mongo",
    "schemas": [
        {
            name: "Song",
            attributes: {
                name: {
                    type: "string",
                    required: true,
                },
                description: {
                    type: "string"
                }
            }
        },
        {
            name: "Album"
            attributes: {
                name: {
                    type: "string",
                    required: true,
                },
                description: {
                    type: "string",
                },
                thumbnail: {
                    type: "string"
                },
                songs: {
                    collection: "song"
                }
            }
        }
    ]
}
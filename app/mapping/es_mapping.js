module.exports = {
	"mappings": {
        "properties": {
            "id": { "type": "string", "index": "not_analyzed" },
            "title": { "type": "string", "index": "not_analyzed" },
            "createAt": { "type": "long", "index": "not_analyzed" },
            "updatedAt": { "type": "long", "index": "not_analyzed" },
            "comments":{
            	"properties": {
		            "commentid": { "type": "string", "index": "not_analyzed" },
		            "comment": { "type": "string", "index": "not_analyzed" },
		            "commentCreateAt": { "type": "long", "index": "not_analyzed" },
		            "commentUpdatedAt": { "type": "long", "index": "not_analyzed" }
		        }
            }
        }
    }
}
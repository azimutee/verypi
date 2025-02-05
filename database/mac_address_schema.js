/**
 * 간단한 설정들이 저장되는 스키마
 */

// module.exports에 MacSchema 객체 직접 할당

var SchemaObj = {};

SchemaObj.createSchema = function(mongoose) {

    var MacSchema = mongoose.Schema({
	    rule_name: {type: String, trim: true, 'default':''},             //규칙 이름
	    mac_address: {type: String, trim: true, 'default':''},             //MAC 주소
	    created_at: {type: Date, index: {unique: false}, 'default': Date.now},
	    updated_at: {type: Date, index: {unique: false}, 'default': Date.now}
	});
	
	// 필수 속성에 대한 'required' validation

    MacSchema.methods = {
        savePost: function(callback) {		// 글 저장
			var self = this;
			
			this.validate(function(err) {
				if (err) return callback(err);
				
				self.save(callback);
			});
		}    
    };
    
    MacSchema.statics = {
		list: function(options, callback) {
			var criteria = options.criteria || {};
			
			this.find(criteria)
				.populate('writer', 'name provider email')
				.sort({'created_at': -1})
//				.limit(Number(options.perPage))
//				.skip(options.perPage * options.page)
				.exec(callback);
		}
	}
    
    console.log('MacSchema 정의함.');

	return MacSchema;
};

// module.exports에 MacSchema 객체 직접 할당
module.exports = SchemaObj;
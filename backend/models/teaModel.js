import mongoose from "mongoose";

const teaSchema = new mongoose.Schema(
    {
    	teaName: {
    		type: String,
    		required: true,
    	},
    	sourceName: {
    		type: String,
    		required: true,
    	},
    	sourceLink: {
    		type: String,
    		validate: {
    		    validator: function(v) {
    		        return /^https?:\/\/.+\..+/.test(v);
    		    },
    		    message: props => `${props.value} is not a valid URL!`
            },
    		required: false,
    	},
    	brewingInfo: {
    		waterTemp: {
    		    value: {
    		        type: String,
    		        required: false,
    		    },
    			unit: {
    			    type: String,
    			    required: false,
    			    enum: ['F', 'C']
                }
    		}, 
    		teaAmountPerCup: {
    			value: {
    		        type: Number,
    		        required: false,
    		    },
    			unit: {
    			    type: String,
    			    required: false,
    			    enum: ['Tablespoon', 'teaspoon', 'grams']
                } 
            },
            steepTime: {
                value: {
                    type: String,
                    required: false,
                },
                unit: {
                    type: String,
                    required: false,
                    enum: ['minutes', 'seconds']
                }
            }
    	}, 
    	typeOfTea: {
    		type: String,
    		required: true,
    		enum: ["Green", "Black", "Herbal", "Oolong", "White", "Puerh", "Other"],
    	},
    	description: {
    		type: String,
    		required: false, 
    	},
    	favorite: {
    	    type: Boolean,
    	    required: true,
    	    default: false
    	}
    },
    	{ timestamps: true}
);

// Pre-save hook to set default temperatures for different types of tea
teaSchema.pre('save', function(next) {
    const defaultTemperatures = {
        'White': '150-155',
        'Green': '165-175', 
        'Oolong': '175-185', 
        'Black': '210-212', 
        'Herbal': '210-212' 
    };
    
    const defaultSteepTimes = {
        'White': '1-2',
        'Green': '1-2',
        'Oolong': '2-3',
        'Black': '2-3',
        'Herbal': '3-6'
    };
    // Set default temperature if not provided
    if (defaultTemperatures[this.typeOfTea] && !this.brewingInfo.waterTemp.value) {
        this.brewingInfo.waterTemp.value = defaultTemperatures[this.typeOfTea];
        this.brewingInfo.waterTemp.unit = 'F'; 
    }
    // Set default steep time if not provided
    if (defaultSteepTimes[this.typeOfTea] && !this.brewingInfo.steepTime.value) {
        this.brewingInfo.steepTime.value = defaultSteepTimes[this.typeOfTea];
        this.brewingInfo.steepTime.unit = 'minutes'; 
    }
    // Set default tea amount per cup if not provided (1 teaspoon per 8 oz)
    if (!this.brewingInfo.teaAmountPerCup.value) {
        this.brewingInfo.teaAmountPerCup.value = 1; 
        this.brewingInfo.teaAmountPerCup.unit = 'teaspoon'; 
    }
    next();
});

teaSchema.index({typeOfTea: 1 });
teaSchema.index({sourceName: 1 });

export const Tea = mongoose.model("Tea", teaSchema);

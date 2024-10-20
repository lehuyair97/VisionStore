const optionSchema = new mongoose.Schema({
    id: { type: String, required: true },
    option_name: { type: String, required: true },
    option_value: { type: String, required: true }
  });
  
  const Option = mongoose.model("Option", optionSchema);
  module.exports = Option;
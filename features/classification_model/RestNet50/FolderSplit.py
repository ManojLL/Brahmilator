import splitfolders

input_folder = "Early_Brahmi"
output_folder = "brahmi_data_reduced"

splitfolders.ratio(input_folder, output_folder, seed="42", ratio=(.6,.2,.2))


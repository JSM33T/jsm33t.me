# import os

# def combine_sql_scripts_sequentially(input_directory, output_file):
#     # List to store filenames with .sql extension
#     sql_files = [f for f in os.listdir(input_directory) if f.endswith(".sql")]
    
#     # Separate files with numeric prefix from those without
#     numeric_prefix_files = []
#     non_numeric_prefix_files = []

#     for f in sql_files:
#         # Try to extract numeric prefix, if any
#         try:
#             # Split by first dot and convert the first part to int
#             int(f.split('.')[0])
#             numeric_prefix_files.append(f)
#         except ValueError:
#             non_numeric_prefix_files.append(f)
    
#     # Sort files with numeric prefix by their prefix number
#     numeric_prefix_files.sort(key=lambda f: int(f.split('.')[0]))

#     # Sort files without numeric prefix lexicographically
#     non_numeric_prefix_files.sort()

#     # Combine numeric prefix files followed by non-numeric prefix files
#     sorted_files = numeric_prefix_files + non_numeric_prefix_files

#     # List to store combined SQL content
#     combined_sql = []
    
#     # Iterate over the sorted filenames
#     for filename in sorted_files:
#         filepath = os.path.join(input_directory, filename)
        
#         with open(filepath, 'r') as file:
#             sql_content = file.read().strip()
            
#             # Check if the last statement ends with 'GO' or 'go'
#             if not sql_content.lower().endswith("go"):
#                 sql_content += "\nGO"
            
#             # Append the script with GO if not present
#             combined_sql.append(sql_content)
    
#     # Write the combined SQL to a file in the main directory
#     with open(output_file, 'w') as master_file:
#         master_file.write("\n\n".join(combined_sql))

# # Example usage: combine SQL scripts from 'table' directory into master file in the main directory
# combine_sql_scripts_sequentially('tables', 'master/master_table.sql')
# combine_sql_scripts_sequentially('sprocs', 'master/master_sproc.sql')
# combine_sql_scripts_sequentially('seed', 'master/master_seed.sql')

import os

def combine_sql_scripts_sequentially(input_directory, output_file):
    # Get the directory where this script is located
    script_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Adjust input and output paths to be relative to the script location
    input_directory = os.path.join(script_dir, input_directory)
    output_file = os.path.join(script_dir, output_file)
    
    # List to store filenames with .sql extension
    sql_files = [f for f in os.listdir(input_directory) if f.endswith(".sql")]
    
    # Separate files with numeric prefix from those without
    numeric_prefix_files = []
    non_numeric_prefix_files = []

    for f in sql_files:
        # Try to extract numeric prefix, if any
        try:
            # Split by first dot and convert the first part to int
            int(f.split('.')[0])
            numeric_prefix_files.append(f)
        except ValueError:
            non_numeric_prefix_files.append(f)
    
    # Sort files with numeric prefix by their prefix number
    numeric_prefix_files.sort(key=lambda f: int(f.split('.')[0]))

    # Sort files without numeric prefix lexicographically
    non_numeric_prefix_files.sort()

    # Combine numeric prefix files followed by non-numeric prefix files
    sorted_files = numeric_prefix_files + non_numeric_prefix_files

    # List to store combined SQL content
    combined_sql = []
    
    # Iterate over the sorted filenames
    for filename in sorted_files:
        filepath = os.path.join(input_directory, filename)
        
        with open(filepath, 'r') as file:
            sql_content = file.read().strip()
            
            # Check if the last statement ends with 'GO' or 'go'
            if not sql_content.lower().endswith("go"):
                sql_content += "\nGO"
            
            # Append the script with GO if not presents
            combined_sql.append(sql_content)
    
    # Write the combined SQL to a file in the main directory
    with open(output_file, 'w') as master_file:
        master_file.write("\n\n".join(combined_sql))

# Example usage: combine SQL scripts from 'table' directory into master file in the main directory
combine_sql_scripts_sequentially('tables', 'master/master_table.sql')
combine_sql_scripts_sequentially('sprocs', 'master/master_sproc.sql')
combine_sql_scripts_sequentially('seed', 'master/master_seed.sql')

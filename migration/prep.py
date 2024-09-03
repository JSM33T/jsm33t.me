# import os

# # Path to the folder containing SQL files
# folder_path = "migration/tables"

# # Create a list to hold the content of each SQL file
# sql_scripts = []

# # Loop through each file in the folder
# for file_name in os.listdir(folder_path):
#     if file_name.endswith(".sql"):
#         file_path = os.path.join(folder_path, file_name)
#         with open(file_path, "r") as file:
#             sql_script = file.read().strip()
#             if not sql_script.endswith("GO"):
#                 sql_script += "\nGO"
#             sql_scripts.append(sql_script)

# # Concatenate all SQL scripts into a single master script
# master_script = "\n\n".join(sql_scripts)

# # Write the master script to a new file
# master_script_path = os.path.join(folder_path, "master_script.sql")
# with open(master_script_path, "w") as master_file:
#     master_file.write(master_script)

# print("Master script created successfully at:", master_script_path)
import os

def concatenate_sql_files(folder_path):
    # Delete existing master_script.sql files if they exist
    existing_master_file = os.path.join(folder_path, "master_script.sql")
    if os.path.exists(existing_master_file):
        os.remove(existing_master_file)
        print(f"Existing master_script.sql file deleted in {folder_path}")
    # Create a list to hold the content of each SQL file
    sql_scripts = []

    # Loop through each file in the folder
    for file_name in os.listdir(folder_path):
        if file_name.endswith(".sql"):
            file_path = os.path.join(folder_path, file_name)
            with open(file_path, "r") as file:
                sql_script = file.read().strip()
                if not sql_script.endswith("GO"):
                    sql_script += "\nGO"
                sql_scripts.append(sql_script)

    # Concatenate all SQL scripts into a single master script
    master_script = "\n\n".join(sql_scripts)

    # Write the master script to a new file
    master_script_path = os.path.join(folder_path, "master_script.sql")
    with open(master_script_path, "w") as master_file:
        master_file.write(master_script)

    print("Master script created successfully at:", master_script_path)

# Example usage:
concatenate_sql_files("tables")
concatenate_sql_files("seed")
concatenate_sql_files("sprocs")
input("Press Enter to exit...")

import os
import ftplib
from typing import List
import yaml

def ftp_upload(ftp: ftplib.FTP, local_file: str, remote_file: str):
    with open(local_file, 'rb') as file:
        ftp.storbinary(f'STOR {remote_file}', file)

def delete_file(ftp: ftplib.FTP, filename: str):
    try:
        ftp.delete(filename)
        print(f"Deleted {filename} from FTP server")
    except ftplib.error_perm as e:
        if not str(e).startswith('550'):  # File not found
            raise

def count_files(directory):
    total = 0
    for root, dirs, files in os.walk(directory):
        total += len(files)
    return total

def process_directory(ftp: ftplib.FTP, local_dir: str, remote_dir: str, total_files: int, processed_files: List[int]):
    ftp.cwd(remote_dir)
    bold = "\033[1m"
    reset = "\033[0m"
    bg_color = "\033[48;5;46m"  # Example: yellow background

    for item in os.listdir(local_dir):
        local_path = os.path.join(local_dir, item)
        remote_path = item

        if os.path.isfile(local_path):
            print(f"Uploading {local_path} to {remote_path}")
            ftp_upload(ftp, local_path, remote_path)
            
            processed_files[0] += 1
            percentage = (processed_files[0] / total_files) * 100
            #print(f"\r[Progress: {percentage:.2f}% ] ({processed_files[0]}/{total_files} files processed)", end="", flush=True)
            print(f"\r{bg_color}{bold}[Progress: {percentage:.2f}% ] ({processed_files[0]}/{total_files} {reset} files processed)", end="", flush=True)
        elif os.path.isdir(local_path):
            print(f"\nProcessing directory {remote_path}")
            try:
                ftp.mkd(remote_path)
            except ftplib.error_perm as e:
                if not str(e).startswith('550'):  # Directory already exists
                    raise
            process_directory(ftp, local_path, remote_path, total_files, processed_files)
    
    ftp.cwd('..')

def main(source_dir: str, ftp_host: str, ftp_user: str, ftp_pass: str, dest_dir: str):
    with ftplib.FTP(ftp_host) as ftp:
        ftp.login(user=ftp_user, passwd=ftp_pass)
        print(f"Connected to FTP server: {ftp_host}")

        # Delete web.config file first
        #delete_file(ftp, 'web.config')
        delete_web_config(ftp_host, ftp_user, ftp_pass, dest_dir)
        total_files = count_files(source_dir)
        processed_files = [0]  # Using a list to allow modification in nested function calls
        
        process_directory(ftp, source_dir, dest_dir, total_files, processed_files)
        
        print("\nFile transfer completed successfully.")

def delete_web_config(ftp_host: str, ftp_user: str, ftp_pass: str, remote_dir: str):
    try:
        with ftplib.FTP(ftp_host) as ftp:
            ftp.login(user=ftp_user, passwd=ftp_pass)
            print(f"Connected to FTP server: {ftp_host}")

            file_to_delete = 'web.config'
            ftp.cwd(remote_dir)
            ftp.delete(file_to_delete)
            print(f"Deleted {file_to_delete} from {remote_dir}")

    except ftplib.all_errors as e:
        print(f"An error occurred: {e}")

def load_config(file_path):
    with open(file_path, "r") as f:
        return yaml.safe_load(f)

if __name__ == "__main__":
    config = load_config("ftp_config.yml")  # specify your YAML config file here

    source_dir = config["source_dir"]
    ftp_host = config["ftp_host"]
    ftp_user = config["ftp_user"]
    ftp_pass = config["ftp_pass"]
    dest_dir = config["dest_dir"]
    
    main(source_dir, ftp_host, ftp_user, ftp_pass, dest_dir)
    input("Press Enter to close...")



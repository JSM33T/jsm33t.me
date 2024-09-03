import os
import subprocess

def run():
    current_directory = os.getcwd()

    # Specify the target directory relative to the current directory where you want to execute the build process
    target_directory = 'src/api/Jassi.API'

    # Change the working directory to the specified target directory relative to the current directory
    os.chdir(os.path.join(current_directory, target_directory))

    dotnet_build_command = "dotnet build -c Release -r win-x64"

    process = subprocess.Popen(dotnet_build_command, shell=True)
    process.communicate()

    print("Build process completed.")

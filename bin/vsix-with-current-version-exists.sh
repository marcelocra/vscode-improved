main () {
    local filename="vscode-improved-$(jq -r .version package.json).vsix"

    echo "Checking if there is already a $filename file..."

    if [ -f ./releases/$filename ]; then
        echo '------------------------------------- ERROR -------------------------------------'
        echo "$filename already exists. Please, update the package.json's"
        echo 'version before running this script again. Or remove the file, IF YOU'
        echo 'REALLY MEAN TO REPLACE IT, but notice that it is in Git LFS, so IT WILL'
        echo 'BE PERMANENTLY LOST!"'
        echo '------------------------------------- ERROR -------------------------------------'

        exit 1
    fi

    echo "No $filename file found, creating it..."
}

main "$@"

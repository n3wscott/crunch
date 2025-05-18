package main

import (
	"fmt"
	"github.com/n3wscott/crunch/pkg/cipher"
	"os"
	"strings"

	"github.com/spf13/cobra"
)

var root = &cobra.Command{
	Use:   "crunch",
	Short: "Crunchlabs Cipher Machine Simulator",
}

func init() {
	var red string
	var blue string
	var key bool
	root.PersistentFlags().StringVarP(&red, "red", "r", "A", "The Red (decoding) wheel key.")
	root.PersistentFlags().StringVarP(&blue, "blue", "b", "A", "The Blue (encoding) wheel key.")
	root.PersistentFlags().BoolVar(&key, "key", false, "Print the Key.")

	var encode = &cobra.Command{
		Use:   "encode",
		Short: "encode",
		Run: func(cmd *cobra.Command, args []string) {
			input := strings.Join(args, " ")

			encoder := cipher.New(blue, red)
			if key {
				encoder.PrintKey("encode", cmd.OutOrStdout())
			}

			output := encoder.Encode(input)
			cmd.Println(output)
		},
	}

	var decode = &cobra.Command{
		Use:   "decode",
		Short: "decode",
		Run: func(cmd *cobra.Command, args []string) {
			input := strings.Join(args, " ")

			encoder := cipher.New(blue, red)
			if key {
				encoder.PrintKey("decode", cmd.OutOrStdout())
			}

			output := encoder.Decode(input)
			cmd.Println(output)
		},
	}

	root.AddCommand(encode, decode)
}

func main() {
	if err := root.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

package cipher

import (
	"fmt"
	"strings"
)

const Code = "zvruwasqblojxtpgcfimkndyeh"

type Rotary interface {
	Encode(string) string
	Decode(string) string
}

func New(blue, red string) Rotary {
	red = strings.ToLower(red)
	blue = strings.ToLower(blue)

	fmt.Println(red, "---", blue)

	encode := map[rune]rune{}
	decode := map[rune]rune{}
	for i, out := range Code {
		// Shift in and out by blue/red values.
		// Blue is decode but changes the encode value.
		// Red in encode. but changes the decode value.

		in := rune(i) + rune(blue[0])
		if in > 'z' {
			in = in - 26
		}

		out = out + (rune(red[0]) - 'a')
		if out > 'z' {
			out = out - 26
		}

		encode[in] = out
		decode[out] = in
		// fmt.Println(string(in), "-->", string(out))
	}

	return &rotary{
		encode: encode,
		decode: decode,
	}
}

type rotary struct {
	encode map[rune]rune
	decode map[rune]rune
}

func (r *rotary) Decode(input string) string {
	return code(r.decode, input)
}

func (r *rotary) Encode(input string) string {
	return code(r.encode, input)
}

func code(lookup map[rune]rune, input string) string {
	input = strings.ToLower(input)
	out := strings.Builder{}

	for _, i := range input {
		if r, found := lookup[i]; found {
			out.WriteRune(r)
		} else {
			out.WriteRune(' ')
		}
	}

	return strings.ToUpper(out.String())
}

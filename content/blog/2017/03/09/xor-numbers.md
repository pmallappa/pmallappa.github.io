+++
title = "XOR Sequence"
date = "2017-03-09T10:48:31+05:30"
linktitle = "XOR Sequence"
description = "Online coding questions"
categories = ['Coding']
author = "Prem Mallappa"
type = "post"
featuredalt = ""
featuredpath = ""
featured = ""
draft = ""
tags = ['coding', 'algo']
+++

Started as an an effort to teach programming to the fresh-grads, here . Not that this is the
ultimate way to do it, rather one of the approach to a given problem.

# The Problem
It is stated in
here [XOR-Sequence](https://www.hackerrank.com/challenges/xor-se) that given a
sequence of array 'A' of size N, whose contents are as follows.
Assumed array index is 'i'.
```math 
A[0] = 0
A[1] = 1 (A[0] ^ i, i = 1)
A[2] = 3 (A[1] ^ i, i = 2)
A[4] = 0 (A[2] ^ i, i = 3)
....
A[N] = '' (A[N-1] ^ i, i = N)
```
Given values 'S' and 'E', for Start and End respectively, find out
```math 
A[S] ^ A[S+1] ^ A[S+2] ^ .... ^ A[E-1] ^ A[E]
```
# Let the computer do the work
In order to know what the sequence look like, I wrote a simple program, which
generates given sequence to a known number. Say for eg 6, it will generate sequence upto i=6

``` go
package main
import ("fmt")
func main() {
	var n, lastXOR uint64
	fmt.Scanf("%d", &n);
	for i:=uint64(0) ; i < n; i++ {
		fmt.Printf("%2d, ", lastXOR^i)
		lastXOR ^= i
	}
}
```

Please note this program may run for longer time if larger integers are given,
but we get the essence of it just by running it for smaller number like `< 100`.

```sh 
$ echo 28 | go run xorgen.go
```
Voila ..
``` sh
 0   1   2   3   4   5   6   7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24, 25, 26, 27  28
 0,  1,  3,  0,  4,  1,  7,  0,  8,  1, 11,  0, 12,  1, 15,  0, 16,  1, 19,  0, 20,  1, 23,  0, 24,  1, 27,  0, 28
 ^               ^               ^               ^               ^               ^               ^               ^
 |               |               |               |               |               |               |               |

```

# First Implementation 
Of course, my first implementation failed miserably with large input sequence.

```go
func getXOR(start, end int) int {
    var lastXOR int
    for ; start < end; start++ {
        lastXOR ^= start
    }
    return lastXOR
}
```

For most of the test cases it didn't even computed results to full extent, on my
laptop it ran for 2 hours for an input sequence. Online system times out with a
compute-intensive operation like above.

``` sh
19
269656199  494630864
130226563  341217047
731964916  832420216
542340130  797666540
23301452   870008140
380088525  890526489
187177803  354216263
615371739  904830084
37808192   762275257
269603062  408398609
15763251   94286582
602143487  683191883
524044437  648225039
10725691   939564919
415709950  439717791
29711842   652998599
81933645   201678107
254074327  383133442
5665651    179364774
```

Looks like there is definitely something we can do so that it is computed with `O(1)`

# XOR patterns
We have all learnt at one time or the other in our lives about Bitwise XOR operation

 OP1 |  OP2 |  XOR |
 --- | ---- | ---- |
   0 |    0 |    0 |
   0 |    1 |    1 |
   1 |    0 |    1 |
   1 |    1 |    0 |
 
Also we see a repeated pattern, if (i MOD 4) result of all the XOR operation is
equal to 'i', Just to remind, 'i' is the index of array
In other words, at i, 

```
when (i MOD 4 == 0), A[i] == i
when (i MOD 4 == 1), A[i] == 1
when (i MOD 4 == 2), A[i] == i + 1
when (i MOD 4 == 3), A[i] == 0
```

Also when `i MOD 4 == 0`, and

```math
i ^ i+1 ^ i+2 ^ i+3 = 2
```

Given the above pattern, we can split the entire sequence into 4 integers
sequence, starting at first multiple of 4 after `start`

We know that,

```math
a ^ 0 = a
a ^ a = 0
a ^ b ^ c = (a ^ b) ^ c
```

For example, if `start=29` and `end = 82` we can split the entire sequence
leaving out `29-31`, and `80-82` as they do not make up to the `4th` number
slot.

```
32-35   -- A1
36-39   -- A2
40-43   -- A3 
44-47   -- A4
...
76-79   -- A9
```

Hence we can write the sequence as (again leaving out `29-31` and `80-82`)

` A1 ^ A2 ^ A3 ^ A4 ^...^ A9 ` 

we can check that, each slot (`A1`, `A2` ...  here, XOR upto `2`)

`32 ^ 33 ^ 34 ^ 35 = 2`


And we know that each of `Ax`is `2` from above. 

All we have to calculate is `A1 ^...^ A9` is **odd** or **even** number of slots.
Because, if we have odd number the result of `A1 ^ A2 ^ .... ^ (2*An + 1)` is
`2`

Finally if there are even number of slots, it results to `0` as `A1=2` and `A2=2` 
`A1 ^ A2 = 0` every send term cancels the one before it.

In our example, we just have to calculate `A[29] ^ A[30] ^ A[31]` and `A[80] ^
A[81] ^ A[82]`, each of the elements have fixed values from our very first
program which implements crude way of XOR'ing.

```
A[28] = 28
A[29] = 1      <--+
A[30] = 30        |- XOR
A[31] = 0      <--+ 
...
```


# Analysis
`O(1)` means the code runs in constant time. In our above example, we see if we
isolate the first and last slots, the in-between slots only contribute as `0` or
`2` depending on if number slots are **_even_** or **_odd_** respectively

# The Code

Following code gets the last slot XORed'

```go
func getLastXOR(start uint64) uint64 {
	var lastXOR uint64 = 0
	idx := start % 4
	switch idx {
	case 3:
		lastXOR = 2
	case 2:
		lastXOR ^= (start + 1)
		start--
		fallthrough
	case 1:
		lastXOR ^= 1
		start--
		fallthrough
	case 0:
		lastXOR ^= start
	}
	return lastXOR
}
```

This one calculates the first slot
```go
func getNextXOR(start uint64) uint64 {
	var nextXOR uint64
	idx := start % 4
	switch idx {
	case 0:
		nextXOR = 2
		start++
	case 1:
		nextXOR ^= 1
		start++
		fallthrough
	case 2:
		nextXOR ^= start + 1
		start++
		fallthrough
	case 3:
		nextXOR ^= 2
	}

	return nextXOR
}
```

This one calculates the number of slots if odd or even and adjust the `start` to
next available multiple of `4`. As well as adjust the `end` to previous availble multiple of `4`.
```go
func calculate(start, end uint64) uint64 {
	newstart := start
	if start%4 != 0 {
		newstart = start + 4 - start%4
	}
	newend := end - end%4
	diff := newend - newstart
	div := diff / 4 % 2
	if div != 0 { // even slots
		return getNextXOR(start) ^ getLastXOR(end)
	}
	// odd number of slots
	return getNextXOR(start) ^ getLastXOR(end) ^ 2
}

```

**=== OVER AND OUT ===**




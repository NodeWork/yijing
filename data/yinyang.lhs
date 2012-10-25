
Generate image for yin-yang yao

> {-# LANGUAGE NoMonomorphismRestriction #-}
> 
> import Diagrams.Prelude
> import Diagrams.Backend.Cairo.CmdLine
> 
> main = defaultMain $
>        yang
>        ===
>        strutY 10
>        ===
>        yin
> 
> heigh = 30
> yangWidth = 160
> yinMargin = 10
> yinWidth = (yangWidth - yinMargin ) / 2
> 
> yang = rect yangWidth heigh # lc black # fc red # lw 3
> yin = (rect yinWidth heigh # lc red # fc black # lw 3)
>       ||| strutX 10
>       ||| (rect yinWidth heigh # fc black # lc red # lw 3)

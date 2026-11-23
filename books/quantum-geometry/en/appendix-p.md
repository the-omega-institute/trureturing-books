# Appendix P Static Ontological QRAM Routing, Physical Record Profiles, and Signed Fourier Proofs {#sec-appendix-p}

In [Section 36.2](ch38-s01-static-qram.md), we introduced the hardware intuition of a motionless storage array addressed by a lightweight pointer (`ptr++` and `*ptr`), contrasting $O(\log_2 N)$ tree routing against $O(N)$ linear scanning and visualizing how a dereferencing copy relocates coherence into the address record rather than destroying it. The full formal derivations underlying that model—reversible routing and clean queries, physical record profiles and fidelity minimizers, and signed Fourier address dereferencing—are gathered here so [Chapter 36](ch38-observer-memory-pointer-and-ontological-qram.md) moves directly into the five-part pointer anatomy of [§36.3](ch38-s02-pointer-anatomy.md):

- [P.1 Reversible routing and clean queries](ch38-s01-s01-routing-and-query.md)
- [P.2 Physical record profiles and fidelity minimizers](ch38-s01-s02-physical-profiles.md)
- [P.3 Signed Fourier records and address dereferencing](ch38-s01-s03-signed-fourier-records.md)

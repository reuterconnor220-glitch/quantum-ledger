import Link from 'next/link';
import { BB84 } from '@/components/learn/BB84';
import { VideoRecommendations } from '@/components/learn/VideoRecommendations';

export const metadata = {
  title: 'BB84 · How Quantum Key Distribution Actually Works',
  description:
    'Interactive BB84 demonstration: Alice → Bob photon polarization key exchange with intercept-resend eavesdropper detection. The 1984 protocol behind every commercial QKD deployment.',
};

export default function BB84Page() {
  return (
    <div className="editorial min-h-screen">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-data font-mono mb-3">
            How QKD actually works
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-medium tracking-tight leading-tight">
            BB84.
          </h1>
          <p className="mt-6 text-xl text-editorial-ink/75 leading-relaxed max-w-[60ch]">
            The 1984 protocol from Charles Bennett and Gilles Brassard that lets two parties share a
            secret key whose security depends on the laws of physics, not on the difficulty of any
            math problem. It is the protocol underneath every commercial QKD product deployed today.
          </p>
        </header>

        <article className="prose-editorial">
          <h2>The setup</h2>
          <p>
            Alice wants to send Bob a random key — a string of bits they can later use as a one-time
            pad to encrypt messages. The problem: she can&apos;t just shout the key over the phone,
            because anyone listening would get it too. Classical cryptography solves this with hard
            math (RSA, ECC, Diffie-Hellman). Quantum cryptography solves it with the laws of physics.
          </p>
          <p>
            BB84 has three ingredients:
          </p>
          <ol>
            <li>
              <strong>Single photons</strong> as the carrier — you can&apos;t copy them without
              disturbing them (no-cloning theorem).
            </li>
            <li>
              <strong>Two complementary bases</strong> — rectilinear (+) measuring H/V, and diagonal
              (×) measuring +45°/−45°. Measuring in the &quot;wrong&quot; basis randomizes the outcome.
            </li>
            <li>
              <strong>A public classical channel</strong> for Alice and Bob to agree on which photons
              to keep — adversaries can listen, but it doesn&apos;t matter what they hear.
            </li>
          </ol>

          <h2>The protocol</h2>
          <p>
            <strong>Step 1 — quantum transmission.</strong> For each bit Alice wants to send, she
            picks at random which basis to encode it in. + basis: 0 → H, 1 → V. × basis: 0 → +45°,
            1 → −45°. She fires the photon to Bob.
          </p>
          <p>
            <strong>Step 2 — measurement.</strong> Bob doesn&apos;t know which basis Alice used,
            so he picks one at random and measures. If he happens to pick the same basis as Alice,
            he gets her bit. If he picks the other basis, his outcome is 50/50 random — quantum
            mechanics gives him no information.
          </p>
          <p>
            <strong>Step 3 — sifting.</strong> Alice and Bob publicly tell each other which basis
            they used for each photon (but not the bit values). They keep only the bits where their
            bases matched. About half the photons are kept. This is the &quot;sifted key.&quot;
          </p>
          <p>
            <strong>Step 4 — error check.</strong> Alice and Bob sacrifice a random sample of sifted
            bits — say 10% — and publicly compare values. If anyone has been listening, the
            no-cloning theorem guarantees their interference shows up as errors. They calculate the
            Quantum Bit Error Rate (QBER). Below a threshold (~11%), the rest of the sifted key is
            safe; above it, they abort.
          </p>

          <h2>Try it</h2>
          <p>
            Hit <strong>Start stream</strong>. The widget runs the protocol photon-by-photon. The
            &quot;Verdict&quot; cell tells you whether the channel is clean. Then enable Eve and
            watch QBER spike past 10%, triggering detection.
          </p>

          <BB84 />

          <VideoRecommendations topic="bb84" />

          <h2>The intercept-resend attack and why it always fails</h2>
          <p>
            Eve&apos;s best classical strategy is intercept-resend: catch each photon, measure it in
            a random basis, then send a fresh photon to Bob encoded in <em>her</em> measured bit and
            basis.
          </p>
          <p>
            This sounds clever, but it leaks. When Eve&apos;s basis matches Alice&apos;s (50% of the
            time), she gets the right bit and re-encodes correctly — Bob&apos;s outcome is correct.
            When Eve&apos;s basis <em>doesn&apos;t</em> match Alice&apos;s (the other 50%), she gets a
            random bit and re-encodes in the wrong basis. Now Bob — if his basis matches Alice&apos;s
            — gets a random outcome from Eve&apos;s wrongly-encoded photon. The math works out to a{' '}
            <strong>~25% error rate on the sifted key</strong> — far above the ~11% detection
            threshold. There is no Eve strategy that avoids this signature.
          </p>

          <h2>What this gives you that PQC doesn&apos;t</h2>
          <p>
            BB84 and post-quantum cryptography (PQC) are not competitors — they solve different
            problems. PQC like ML-KEM and ML-DSA replaces RSA and ECC with classical algorithms
            believed hard for quantum computers. PQC is software, runs on existing infrastructure,
            and is what NIST and NSA are mandating across the U.S. federal government.
          </p>
          <p>
            QKD, by contrast, gives you something stronger but more expensive:
            <strong> information-theoretic security</strong>. The security argument doesn&apos;t
            depend on any hardness assumption that future math could break — it depends only on
            quantum mechanics. The cost is dedicated optical fiber or free-space links, single-photon
            sources, and distance limits set by photon loss (typically 100–200 km without repeaters).
          </p>
          <p>
            Where QKD is deployed today:
          </p>
          <ul>
            <li>
              <strong>China&apos;s national QKD backbone</strong> — Beijing-Shanghai trunk (2,000+
              km via trusted-node relays); Micius satellite for free-space intercontinental links.
            </li>
            <li>
              <strong>EuroQCI</strong> — the European Union&apos;s plan for a continent-wide QKD
              network across all member states, integrated with the IRIS² satellite constellation.
            </li>
            <li>
              <strong>Korean telcos</strong> — SK Telecom and KT have rolled out commercial QKD links
              for finance and government customers.
            </li>
            <li>
              <strong>Swiss banks and Toshiba/UK NQCC</strong> — production QKD links in finance and
              critical infrastructure.
            </li>
          </ul>

          <h2>The NSA position</h2>
          <p>
            For U.S. national-security systems, the NSA explicitly prefers PQC over QKD, citing
            engineering challenges (dedicated hardware, distance limits, denial-of-service exposure on
            the optical channel) and the difficulty of authenticating the classical channel without
            already shared secrets. For non-NSS contexts — and for any defense-in-depth posture where
            information-theoretic security justifies the cost — QKD remains viable and is being
            actively procured globally.
          </p>

          <h2>Why this matters for investors</h2>
          <p>
            The QKD market is small ($1–2B annually) and dominated by ID Quantique, Toshiba, and
            Chinese players, but it is one of the few quantum technology categories with shipping
            products and real procurement budgets today. The bigger commercial story is what QKD
            represents: <strong>a working quantum-information technology delivered to paying
            customers right now</strong>, while gate-model quantum computing is still pre-revenue at
            scale. QKD is the proof point that quantum hardware can productize.
          </p>
          <p>
            Device-independent QKD — where security is guaranteed by Bell-inequality violation
            rather than trust in the hardware — is the long-term frontier, currently the subject of
            multiple satellite-QKD demonstrations.
          </p>

          <hr />

          <p>
            Next, see <Link href="/learn/bell-test">the Bell test</Link> — the experiment proving
            quantum nonlocality, which is what device-independent QKD relies on. Or jump to the{' '}
            <Link href="/glossary">glossary</Link> for every PQC and QKD term defined, or{' '}
            <Link href="/papers">papers</Link> to read Bennett &amp; Brassard 1984.
          </p>
        </article>
      </div>
    </div>
  );
}

import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Svg,
  Path,
  Rect,
} from "@react-pdf/renderer";

/* ─────────────────────────────────────────
   FONTS
───────────────────────────────────────── */
Font.register({
  family: "Manrope",
  fonts: [
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/manrope@latest/latin-400-normal.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/manrope@latest/latin-500-normal.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdn.jsdelivr.net/fontsource/fonts/manrope@latest/latin-700-normal.ttf",
      fontWeight: 700,
    },
  ],
});

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const T = {
  black: "#020618",
  slate: "#334155",
  muted: "#64748b",
  subtle: "#94a3b8",
  border: "#f1f5f9",
  surface: "#f8fafc",
  green: "#22c55e",
  greenBg: "#f0fdf4",
  indigo: "#4f46e5",
  indigoBg: "#f5f3ff",
  indigoBorder: "#ddd6fe",
  amber: "#f59e0b",
  red: "#ef4444",
  redBorder: "#fee2e2",
  white: "#ffffff",
};

/* ─────────────────────────────────────────
   STYLES
───────────────────────────────────────── */
const S = StyleSheet.create({
  /* Layout */
  page: {
    padding: 50,
    backgroundColor: T.white,
    fontFamily: "Manrope",
    color: T.black,
    fontSize: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: T.border,
    paddingBottom: 20,
    marginBottom: 36,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: T.border,
    paddingTop: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  row: { flexDirection: "row" },
  col: { flex: 1 },

  /* Typography */
  h1: {
    fontSize: 26,
    fontWeight: 700,
    color: T.black,
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  h2: {
    fontSize: 11,
    fontWeight: 700,
    color: T.black,
    textTransform: "uppercase",
    letterSpacing: 1,
    borderLeftWidth: 3,
    borderLeftColor: T.green,
    paddingLeft: 10,
    marginBottom: 16,
  },
  label: {
    fontSize: 8,
    fontWeight: 700,
    color: T.subtle,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  caption: { fontSize: 8, color: T.subtle },
  meta: {
    fontSize: 10,
    fontWeight: 700,
    color: T.muted,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },

  /* Badge */
  badge: {
    fontSize: 8,
    fontWeight: 700,
    color: T.green,
    backgroundColor: T.greenBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  /* Score bar */
  scoreRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 6,
  },
  scoreVal: { fontSize: 20, fontWeight: 700, color: T.black },
  scoreLabel: { fontSize: 9, color: T.muted },
  barBg: {
    height: 10,
    backgroundColor: T.border,
    borderRadius: 5,
    overflow: "hidden",
    marginBottom: 18,
  },
  barFill: { height: "100%", borderRadius: 5 },

  /* Verdict box */
  verdictBox: {
    flex: 1,
    backgroundColor: T.surface,
    borderRadius: 16,
    padding: 22,
    borderWidth: 1,
    borderColor: T.border,
  },
  verdictTag: {
    fontSize: 8,
    fontWeight: 700,
    color: T.indigo,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 10,
  },
  verdictText: {
    fontSize: 12,
    lineHeight: 1.65,
    color: T.slate,
    fontWeight: 500,
  },

  /* Cards */
  card: {
    flex: 1,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: T.border,
    backgroundColor: T.white,
  },
  cardHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardTitle: { fontSize: 10, fontWeight: 700, color: T.black },
  cardScore: { fontSize: 13, fontWeight: 700 },
  cardBody: { fontSize: 8.5, lineHeight: 1.45, color: T.muted },

  /* List */
  listWrap: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: T.white,
    borderWidth: 1,
    borderColor: T.border,
  },
  listItem: { flexDirection: "row", marginBottom: 7 },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 3.5,
    marginRight: 9,
    flexShrink: 0,
  },
  listText: { fontSize: 9, lineHeight: 1.5, color: "#475569", flex: 1 },

  /* Tags */
  tagWrap: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  tag: {
    fontSize: 8,
    fontWeight: 700,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: T.indigoBg,
    color: T.indigo,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: T.indigoBorder,
  },

  /* Recommendation */
  recItem: {
    padding: 14,
    backgroundColor: T.surface,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: T.indigo,
  },
  recText: { fontSize: 9.5, lineHeight: 1.55, color: T.slate },
});

/* ─────────────────────────────────────────
   BRAND LOGO (SVG → @react-pdf Svg)
───────────────────────────────────────── */
const BrandLogo = () => (
  <Svg width="103" height="35" viewBox="0 0 103 35">
    <Path
      fill="#020618"
      d="M1.708 28V14.56H4.788V28H1.708ZM4.788 20.524L3.724 19.992C3.724 18.2933 4.09733 16.9213 4.844 15.876C5.60933 14.812 6.75733 14.28 8.288 14.28C8.96 14.28 9.56667 14.4013 10.108 14.644C10.6493 14.8867 11.1533 15.2787 11.62 15.82L9.604 17.892C9.36133 17.6307 9.09067 17.444 8.792 17.332C8.49333 17.22 8.148 17.164 7.756 17.164C6.89733 17.164 6.188 17.4347 5.628 17.976C5.068 18.5173 4.788 19.3667 4.788 20.524ZM18.9442 28.28C17.6002 28.28 16.3869 27.9813 15.3042 27.384C14.2402 26.768 13.3909 25.928 12.7562 24.864C12.1402 23.8 11.8322 22.6053 11.8322 21.28C11.8322 19.9547 12.1402 18.7693 12.7562 17.724C13.3722 16.66 14.2029 15.82 15.2482 15.204C16.3122 14.588 17.4882 14.28 18.7762 14.28C20.0269 14.28 21.1282 14.5693 22.0802 15.148C23.0509 15.7267 23.8069 16.52 24.3482 17.528C24.9082 18.536 25.1882 19.684 25.1882 20.972C25.1882 21.196 25.1695 21.4293 25.1322 21.672C25.1135 21.896 25.0762 22.148 25.0202 22.428H13.9882V19.908H23.4242L22.2762 20.916C22.2389 20.0947 22.0802 19.404 21.8002 18.844C21.5202 18.284 21.1189 17.8547 20.5962 17.556C20.0922 17.2573 19.4669 17.108 18.7202 17.108C17.9362 17.108 17.2549 17.276 16.6762 17.612C16.0975 17.948 15.6495 18.424 15.3322 19.04C15.0149 19.6373 14.8562 20.356 14.8562 21.196C14.8562 22.036 15.0242 22.7733 15.3602 23.408C15.6962 24.0427 16.1722 24.5373 16.7882 24.892C17.4042 25.228 18.1135 25.396 18.9162 25.396C19.6069 25.396 20.2415 25.2747 20.8202 25.032C21.4175 24.7893 21.9215 24.4347 22.3322 23.968L24.2922 25.956C23.6389 26.7213 22.8455 27.3 21.9122 27.692C20.9789 28.084 19.9895 28.28 18.9442 28.28ZM32.0532 28.28C31.3066 28.28 30.5879 28.1867 29.8972 28C29.2066 27.7947 28.5719 27.5147 27.9932 27.16C27.4146 26.7867 26.9106 26.3387 26.4812 25.816L28.4412 23.856C28.9079 24.3973 29.4399 24.808 30.0372 25.088C30.6532 25.3493 31.3439 25.48 32.1092 25.48C32.7999 25.48 33.3226 25.3773 33.6772 25.172C34.0319 24.9667 34.2092 24.668 34.2092 24.276C34.2092 23.8653 34.0412 23.548 33.7052 23.324C33.3692 23.1 32.9306 22.9133 32.3892 22.764C31.8666 22.596 31.3066 22.428 30.7092 22.26C30.1306 22.092 29.5706 21.868 29.0292 21.588C28.5066 21.2893 28.0772 20.888 27.7412 20.384C27.4052 19.88 27.2372 19.2267 27.2372 18.424C27.2372 17.5653 27.4332 16.828 27.8252 16.212C28.2359 15.596 28.8052 15.12 29.5332 14.784C30.2799 14.448 31.1666 14.28 32.1932 14.28C33.2759 14.28 34.2279 14.476 35.0492 14.868C35.8892 15.2413 36.5892 15.8107 37.1492 16.576L35.1892 18.536C34.7972 18.0507 34.3492 17.6867 33.8452 17.444C33.3412 17.2013 32.7626 17.08 32.1092 17.08C31.4932 17.08 31.0172 17.1733 30.6812 17.36C30.3452 17.5467 30.1772 17.8173 30.1772 18.172C30.1772 18.5453 30.3452 18.8347 30.6812 19.04C31.0172 19.2453 31.4466 19.4227 31.9692 19.572C32.5106 19.7213 33.0706 19.8893 33.6492 20.076C34.2466 20.244 34.8066 20.4867 35.3292 20.804C35.8706 21.1027 36.3092 21.5133 36.6452 22.036C36.9812 22.54 37.1492 23.2027 37.1492 24.024C37.1492 25.3307 36.6919 26.3667 35.7772 27.132C34.8626 27.8973 33.6212 28.28 32.0532 28.28ZM45.2045 28.28C44.0658 28.28 43.0485 28.028 42.1525 27.524C41.2751 27.02 40.5845 26.3293 40.0805 25.452C39.5951 24.556 39.3525 23.5293 39.3525 22.372V14.56H42.4325V22.232C42.4325 22.8853 42.5351 23.4453 42.7405 23.912C42.9645 24.36 43.2818 24.7053 43.6925 24.948C44.1218 25.1907 44.6258 25.312 45.2045 25.312C46.1005 25.312 46.7818 25.0507 47.2485 24.528C47.7338 23.9867 47.9765 23.2213 47.9765 22.232V14.56H51.0565V22.372C51.0565 23.548 50.8045 24.584 50.3005 25.48C49.8151 26.3573 49.1338 27.048 48.2565 27.552C47.3791 28.0373 46.3618 28.28 45.2045 28.28ZM54.1533 28V14.56H57.2333V28H54.1533ZM63.0853 28V19.992C63.0853 19.096 62.8053 18.4053 62.2453 17.92C61.6853 17.416 60.9946 17.164 60.1733 17.164C59.6133 17.164 59.1093 17.276 58.6613 17.5C58.232 17.724 57.8866 18.0507 57.6253 18.48C57.364 18.8907 57.2333 19.3947 57.2333 19.992L56.0293 19.32C56.0293 18.2933 56.2533 17.4067 56.7013 16.66C57.1493 15.9133 57.756 15.3347 58.5213 14.924C59.2866 14.4947 60.1453 14.28 61.0973 14.28C62.0493 14.28 62.908 14.4853 63.6733 14.896C64.4386 15.3067 65.0453 15.8853 65.4933 16.632C65.9413 17.3787 66.1653 18.2747 66.1653 19.32V28H63.0853ZM72.0173 28V19.992C72.0173 19.096 71.7373 18.4053 71.1773 17.92C70.6173 17.416 69.9266 17.164 69.1053 17.164C68.564 17.164 68.0693 17.276 67.6213 17.5C67.1733 17.724 66.8186 18.0507 66.5573 18.48C66.296 18.8907 66.1653 19.3947 66.1653 19.992L64.4293 19.32C64.5226 18.2933 64.8213 17.4067 65.3253 16.66C65.8293 15.9133 66.4733 15.3347 67.2573 14.924C68.06 14.4947 68.9373 14.28 69.8893 14.28C70.86 14.28 71.7373 14.4853 72.5213 14.896C73.3053 15.3067 73.9306 15.8853 74.3973 16.632C74.864 17.3787 75.0973 18.2747 75.0973 19.32V28H72.0173ZM84.5145 28.28C83.1705 28.28 81.9572 27.9813 80.8745 27.384C79.8105 26.768 78.9612 25.928 78.3265 24.864C77.7105 23.8 77.4025 22.6053 77.4025 21.28C77.4025 19.9547 77.7105 18.7693 78.3265 17.724C78.9425 16.66 79.7732 15.82 80.8185 15.204C81.8825 14.588 83.0585 14.28 84.3465 14.28C85.5972 14.28 86.6985 14.5693 87.6505 15.148C88.6212 15.7267 89.3772 16.52 89.9185 17.528C90.4785 18.536 90.7585 19.684 90.7585 20.972C90.7585 21.196 90.7398 21.4293 90.7025 21.672C90.6838 21.896 90.6465 22.148 90.5905 22.428H79.5585V19.908H88.9945L87.8465 20.916C87.8092 20.0947 87.6505 19.404 87.3705 18.844C87.0905 18.284 86.6892 17.8547 86.1665 17.556C85.6625 17.2573 85.0372 17.108 84.2905 17.108C83.5065 17.108 82.8252 17.276 82.2465 17.612C81.6678 17.948 81.2198 18.424 80.9025 19.04C80.5852 19.6373 80.4265 20.356 80.4265 21.196C80.4265 22.036 80.5945 22.7733 80.9305 23.408C81.2665 24.0427 81.7425 24.5373 82.3585 24.892C82.9745 25.228 83.6838 25.396 84.4865 25.396C85.1772 25.396 85.8118 25.2747 86.3905 25.032C86.9878 24.7893 87.4918 24.4347 87.9025 23.968L89.8625 25.956C89.2092 26.7213 88.4158 27.3 87.4825 27.692C86.5492 28.084 85.5598 28.28 84.5145 28.28Z"
    />
    <Rect
      x="97"
      y="22"
      width="5"
      height="5"
      rx="2.5"
      fill="#00A63E"
      stroke="#00A63E"
      strokeWidth="2"
    />
  </Svg>
);

/* ─────────────────────────────────────────
   REUSABLE COMPONENTS
───────────────────────────────────────── */
const Header = ({ badge }) => (
  <View style={S.header}>
    <BrandLogo />
    {badge && <Text style={S.badge}>{badge}</Text>}
  </View>
);

const Footer = ({ left }) => (
  <View style={S.footer}>
    <Text style={S.caption}>{left}</Text>
    <Text
      style={S.caption}
      render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    />
  </View>
);

const ScoreBar = ({ label, value, color }) => (
  <View>
    <View style={S.scoreRow}>
      <Text style={S.scoreLabel}>{label}</Text>
      <Text style={S.scoreVal}>{value}%</Text>
    </View>
    <View style={S.barBg}>
      <View
        style={[S.barFill, { width: `${value}%`, backgroundColor: color }]}
      />
    </View>
  </View>
);

const SectionHeading = ({ children }) => <Text style={S.h2}>{children}</Text>;

const BulletList = ({ items = [], color, max }) => (
  <>
    {(max ? items.slice(0, max) : items).map((item, i) => (
      <View key={i} style={S.listItem}>
        <View style={[S.bullet, { backgroundColor: color }]} />
        <Text style={S.listText}>{item}</Text>
      </View>
    ))}
  </>
);

/* ─────────────────────────────────────────
   PAGE 1 SECTIONS
───────────────────────────────────────── */
const HeroSection = ({ targetRole, country, experienceLevel }) => (
  <View style={{ marginBottom: 32 }}>
    <Text style={S.meta}>
      {country} • {experienceLevel}
    </Text>
    <Text style={S.h1}>{targetRole}</Text>
  </View>
);

const ScoreVerdictSection = ({ overallScore, atsScore, criticalVerdict }) => (
  <View style={[S.row, { gap: 24, marginBottom: 36 }]}>
    <View style={{ width: "38%" }}>
      <Text style={[S.label, { marginBottom: 14 }]}>Summary Scores</Text>
      <ScoreBar label="Overall Match" value={overallScore} color={T.green} />
      <ScoreBar label="ATS Compatibility" value={atsScore} color={T.indigo} />
    </View>
    <View style={S.verdictBox}>
      <Text style={S.verdictTag}>The Expert Verdict</Text>
      <Text style={S.verdictText}>"{criticalVerdict}"</Text>
    </View>
  </View>
);

const StructuralSection = ({ sections }) => {
  const cards = [
    { key: "experience", label: "Experience", color: T.green },
    { key: "skills", label: "Skills", color: T.indigo },
    { key: "education", label: "Education", color: T.amber },
  ];
  return (
    <View style={{ marginBottom: 32 }}>
      <SectionHeading>Structural Evaluation</SectionHeading>
      <View style={[S.row, { gap: 12 }]}>
        {cards.map(({ key, label, color }) => (
          <View key={key} style={S.card}>
            <View style={S.cardHead}>
              <Text style={S.cardTitle}>{label}</Text>
              <Text style={[S.cardScore, { color }]}>
                {sections?.[key]?.score}%
              </Text>
            </View>
            <Text style={S.cardBody}>"{sections?.[key]?.feedback}"</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const StrengthsWeaknessesSection = ({ strengths, weaknesses }) => (
  <View style={[S.row, { gap: 20, marginBottom: 32 }]}>
    <View style={S.col}>
      <SectionHeading>Key Strengths</SectionHeading>
      <View style={S.listWrap}>
        <BulletList items={strengths} color={T.green} max={5} />
      </View>
    </View>
    <View style={S.col}>
      <SectionHeading>Focus Areas</SectionHeading>
      <View style={S.listWrap}>
        <BulletList items={weaknesses} color={T.red} max={5} />
      </View>
    </View>
  </View>
);

/* ─────────────────────────────────────────
   PAGE 2 SECTIONS
───────────────────────────────────────── */
const AtsSection = ({ ats_issues, top_missing_keywords }) => (
  <View style={[S.row, { gap: 20, marginBottom: 32 }]}>
    <View style={S.col}>
      <SectionHeading>Critical ATS Hurdles</SectionHeading>
      <View style={[S.listWrap, { borderColor: T.redBorder }]}>
        {ats_issues?.length > 0 ? (
          <BulletList items={ats_issues} color={T.red} />
        ) : (
          <Text style={S.listText}>No critical ATS hurdles detected.</Text>
        )}
      </View>
    </View>
    <View style={S.col}>
      <SectionHeading>Keyword Gap Analysis</SectionHeading>
      <View style={S.tagWrap}>
        {top_missing_keywords?.map((kw, i) => (
          <Text key={i} style={S.tag}>
            {kw}
          </Text>
        ))}
      </View>
    </View>
  </View>
);

const SuggestionsSection = ({ suggestions }) => (
  <View>
    <SectionHeading>Strategic Path Forward</SectionHeading>
    {suggestions?.map((s, i) => (
      <View key={i} style={S.recItem}>
        <Text style={S.recText}>{s}</Text>
      </View>
    ))}
  </View>
);

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
const PDFReport = ({ analysis }) => {
  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Document>
      {/* ── Page 1: Summary ── */}
      <Page size="A4" style={S.page}>
        <Header badge="Confidential Evaluation" />

        <HeroSection
          targetRole={analysis.targetRole}
          country={analysis.country}
          experienceLevel={analysis.experienceLevel}
        />
        <ScoreVerdictSection
          overallScore={analysis.overallScore}
          atsScore={analysis.atsScore}
          criticalVerdict={analysis.criticalVerdict}
        />
        <StructuralSection sections={analysis.sections} />
        <StrengthsWeaknessesSection
          strengths={analysis.strengths}
          weaknesses={analysis.weaknesses}
        />

        <Footer
          left={`Generated by AI on ${date} — Resume Analyzer Expert Series`}
        />
      </Page>

      {/* ── Page 2: Optimization ── */}
      <Page size="A4" style={S.page}>
        <Header />

        <AtsSection
          ats_issues={analysis.ats_issues}
          top_missing_keywords={analysis.top_missing_keywords}
        />
        <SuggestionsSection suggestions={analysis.suggestions} />

        <Footer
          left={`© ${new Date().getFullYear()} Resume Analyzer. For evaluation purposes only.`}
        />
      </Page>
    </Document>
  );
};

export default PDFReport;

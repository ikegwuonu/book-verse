import PDFViewer from "@/components/PDFViewer";

export default function Page() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">PDF Preview</h1>
      <PDFViewer url="https://ik.imagekit.io/ikegwuonu/Juliet_FE_CV_EixDAmfGf.pdf" />
    </div>
  );
}

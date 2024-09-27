import { providerModel } from "@/lib/models/provider";

const _urls = new Map<string, string>();

export const loadAuthImage = async (
  src: string,
  callback: (newUrl: string) => void,
) => {
  if (_urls.has(src)) {
    callback(_urls.get(src)!);

    return () => {
      URL.revokeObjectURL(_urls.get(src)!);
      _urls.delete(src);
    };
  }

  const res = await fetch(src, {
    headers: {
      Authorization: `Bearer ${providerModel.client.token}`,
    },
  });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  _urls.set(src, url);
  callback(url);

  return () => {
    URL.revokeObjectURL(url);
    _urls.delete(src);
  };
};

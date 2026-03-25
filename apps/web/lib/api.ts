export const getFormConfig = async (slug: string): Promise<any> => {
  // In a real app, this might fetch from an API or local JSON
  const response = await fetch(`/config/forms/${slug}.json`);
  return response.json();
};

export const submitLead = async (data: any) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/leads/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

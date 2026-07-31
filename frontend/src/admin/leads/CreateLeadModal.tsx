import { useState } from "react";
import { leadsApi, type CreateLeadInput } from "../lib/api";
import { useDistricts, useProvinces } from "../lib/useLocations";
import { errorMessage } from "../lib/useAsync";
import { Button, Field, Input, SectionHeading, Select, Textarea } from "../ui/primitives";
import { Modal } from "../ui/Modal";
import { useToast } from "../ui/Toast";

const COUNTRY_OPTIONS = [
  { value: "Nepal", label: "Nepal" },
  { value: "International", label: "International" },
];

const INITIAL = {
  businessName: "",
  businessType: "",
  contactPersonName: "",
  contact1: "",
  contact2: "",
  contact3: "",
  email1: "",
  email2: "",
  country: "Nepal" as "Nepal" | "International",
  provinceId: "",
  districtId: "",
  cityMunicipality: "",
  locationFreeText: "",
  landmarkArea: "",
  description: "",
};

function orNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export function CreateLeadModal({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: () => Promise<void> | void;
}) {
  const toast = useToast();
  const [form, setForm] = useState(INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const provinces = useProvinces();
  const provinceId = form.provinceId ? Number(form.provinceId) : null;
  const districts = useDistricts(provinceId);
  const isNepal = form.country === "Nepal";

  function set<K extends keyof typeof INITIAL>(key: K, value: (typeof INITIAL)[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function close() {
    setForm(INITIAL);
    setError(null);
    onClose();
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    // Mirror the backend's conditional requirements so the user sees the problem inline.
    if (isNepal && (!form.provinceId || !form.districtId || !form.cityMunicipality.trim())) {
      setError("Province, district, and city/municipality are required when country is Nepal.");
      return;
    }
    if (!isNepal && !form.locationFreeText.trim()) {
      setError("Location is required when country is International.");
      return;
    }

    setBusy(true);
    try {
      const payload: CreateLeadInput = {
        businessName: form.businessName.trim(),
        businessType: form.businessType.trim(),
        contactPersonName: orNull(form.contactPersonName),
        contact1: orNull(form.contact1),
        contact2: orNull(form.contact2),
        contact3: orNull(form.contact3),
        email1: orNull(form.email1),
        email2: orNull(form.email2),
        country: form.country,
        provinceId: isNepal && form.provinceId ? Number(form.provinceId) : null,
        districtId: isNepal && form.districtId ? Number(form.districtId) : null,
        cityMunicipality: isNepal ? orNull(form.cityMunicipality) : null,
        locationFreeText: isNepal ? null : orNull(form.locationFreeText),
        landmarkArea: orNull(form.landmarkArea),
        description: orNull(form.description),
        source: "manual",
      };

      await leadsApi.create(payload);
      toast.success("Lead created and placed into a cluster.");
      await onCreated();
      close();
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={close}
      title="Create lead"
      size="lg"
      footer={
        <>
          <Button variant="secondary" onClick={close} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" form="create-lead-form" loading={busy}>
            Create lead
          </Button>
        </>
      }
    >
      <form id="create-lead-form" onSubmit={submit} className="space-y-6">
        <section>
          <SectionHeading>Business Details</SectionHeading>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Business Name" htmlFor="cl-bn">
              <Input
                id="cl-bn"
                required
                autoFocus
                maxLength={200}
                placeholder="Business name"
                value={form.businessName}
                onChange={(e) => set("businessName", e.target.value)}
              />
            </Field>
            <Field label="Business Type" htmlFor="cl-bt">
              <Input
                id="cl-bt"
                required
                maxLength={100}
                placeholder="e.g. Restaurant, College"
                value={form.businessType}
                onChange={(e) => set("businessType", e.target.value)}
              />
            </Field>
            <Field label="Contact Person" htmlFor="cl-cp">
              <Input
                id="cl-cp"
                maxLength={100}
                placeholder="Contact person name"
                value={form.contactPersonName}
                onChange={(e) => set("contactPersonName", e.target.value)}
              />
            </Field>
            <Field label="Contact Number 1" htmlFor="cl-c1">
              <Input
                id="cl-c1"
                maxLength={50}
                value={form.contact1}
                onChange={(e) => set("contact1", e.target.value)}
              />
            </Field>
            <Field label="Contact Number 2" htmlFor="cl-c2">
              <Input
                id="cl-c2"
                maxLength={50}
                value={form.contact2}
                onChange={(e) => set("contact2", e.target.value)}
              />
            </Field>
            <Field label="Contact Number 3" htmlFor="cl-c3">
              <Input
                id="cl-c3"
                maxLength={50}
                value={form.contact3}
                onChange={(e) => set("contact3", e.target.value)}
              />
            </Field>
            <Field label="Email Address 1" htmlFor="cl-e1">
              <Input
                id="cl-e1"
                type="email"
                maxLength={100}
                value={form.email1}
                onChange={(e) => set("email1", e.target.value)}
              />
            </Field>
            <Field label="Email Address 2" htmlFor="cl-e2">
              <Input
                id="cl-e2"
                type="email"
                maxLength={100}
                value={form.email2}
                onChange={(e) => set("email2", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section>
          <SectionHeading>Location Details</SectionHeading>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Country" htmlFor="cl-country">
              <Select
                id="cl-country"
                value={form.country}
                onChange={(e) => {
                  const country = e.target.value as "Nepal" | "International";
                  setForm((prev) => ({
                    ...prev,
                    country,
                    ...(country === "International"
                      ? { provinceId: "", districtId: "", cityMunicipality: "" }
                      : { locationFreeText: "" }),
                  }));
                }}
                options={COUNTRY_OPTIONS}
              />
            </Field>

            {isNepal ? (
              <>
                <Field label="Province" htmlFor="cl-prov" hint="required">
                  <Select
                    id="cl-prov"
                    value={form.provinceId}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        provinceId: e.target.value,
                        districtId: "",
                      }))
                    }
                    placeholder="Select province"
                    options={provinces.map((p) => ({ value: String(p.id), label: p.name }))}
                  />
                </Field>
                <Field label="District" htmlFor="cl-dist" hint="required">
                  <Select
                    id="cl-dist"
                    value={form.districtId}
                    disabled={!provinceId}
                    onChange={(e) => set("districtId", e.target.value)}
                    placeholder={provinceId ? "Select district" : "Select province first"}
                    options={districts.map((d) => ({ value: String(d.id), label: d.name }))}
                  />
                </Field>
                <Field label="City / Municipality" htmlFor="cl-city" hint="required">
                  <Input
                    id="cl-city"
                    maxLength={100}
                    value={form.cityMunicipality}
                    onChange={(e) => set("cityMunicipality", e.target.value)}
                  />
                </Field>
              </>
            ) : (
              <Field label="Location" htmlFor="cl-lft" hint="required" className="sm:col-span-2">
                <Input
                  id="cl-lft"
                  maxLength={200}
                  placeholder="City, region, country"
                  value={form.locationFreeText}
                  onChange={(e) => set("locationFreeText", e.target.value)}
                />
              </Field>
            )}

            <Field label="Landmark / Area" htmlFor="cl-lm">
              <Input
                id="cl-lm"
                maxLength={200}
                value={form.landmarkArea}
                onChange={(e) => set("landmarkArea", e.target.value)}
              />
            </Field>
          </div>
        </section>

        <section>
          <SectionHeading>Description</SectionHeading>
          <Textarea
            className="mt-3"
            rows={3}
            maxLength={2000}
            placeholder="Notes about this lead"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            aria-label="Description"
          />
        </section>

        {error && (
          <p role="alert" className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700 ring-1 ring-rose-200">
            {error}
          </p>
        )}
      </form>
    </Modal>
  );
}

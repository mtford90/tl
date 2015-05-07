from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _
from grappelli.dashboard import modules, Dashboard


class CustomIndexDashboard(Dashboard):
  def __init__(self, **kwargs):
    super().__init__(**kwargs)

  def init_with_context(self, context):
    self.children.append(modules.ModelList(
      _('Timezones App'),
      column=1,
      collapsible=False,
      models=(
        'timezones.models.ToptalUser',
        'timezones.models.Timezone'
      ),
    ))

    self.children.append(modules.RecentActions(
      _('Recent Actions'),
      limit=5,
      collapsible=False,
      column=3,
    ))
